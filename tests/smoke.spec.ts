import { expect, test, type Locator, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const scope = window as typeof window & { mywikInputEvents?: unknown[] };
    scope.mywikInputEvents = [];
    const record = (type: string, node: EventTarget | null) => {
      if (!(node instanceof HTMLTextAreaElement || node instanceof HTMLInputElement)) return;
      const target = node as typeof node & { _valueTracker?: { getValue: () => string } };
      const key = Object.keys(target).find(name => name.startsWith('__reactProps'));
      const props = key ? (target as unknown as Record<string, { value?: string }>)[key] : undefined;
      scope.mywikInputEvents!.push({ type, at: performance.now(), label: target.getAttribute('aria-label'), domValue: target.value, reactValue: props?.value, trackedValue: target._valueTracker?.getValue() });
    };
    for (const type of ['focusin', 'focusout', 'input', 'change']) document.addEventListener(type, event => {
      const node = event.target;
      record(type, node);
      requestAnimationFrame(() => record(`${type}:frame`, node));
    }, true);
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) return;
  const events = await page.evaluate(() => (window as typeof window & { mywikInputEvents?: unknown[] }).mywikInputEvents ?? []).catch(() => []);
  await testInfo.attach('editor-input-events', { body: JSON.stringify(events, null, 2), contentType: 'application/json' });
});

async function isolateCloud(page: Page) {
  await page.context().route('**/*', route => {
    const url = new URL(route.request().url());
    return ['127.0.0.1', 'localhost'].includes(url.hostname) || ['data:', 'blob:'].includes(url.protocol)
      ? route.continue()
      : route.abort();
  });
}

async function openDeckungsbeitrag(page: Page) {
  await page.getByRole('button', { name: 'Zur Startseite', exact: true }).click();
  await page.getByRole('button', { name: /^Fächer/ }).click();
  await page.getByRole('button', { name: /^Rechnungswesen,/ }).click();
  await page.getByRole('button', { name: /1\.2\.1 Deckungsbeitrag/ }).click();
  await expect(page.getByText('Der Deckungsbeitrag', { exact: true })).toBeVisible();
}

/** Compute contrast against the nearest opaque painted ancestor, not against an assumed theme. */
async function textContrast(locator: Locator) {
  return locator.evaluate(element => {
    const parse = (color: string) => color.match(/[\d.]+/g)?.map(Number) ?? [];
    const luminance = (channels: number[]) => channels.slice(0, 3).map(value => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    let ancestor: Element | null = element;
    let background: number[] = [];
    while (ancestor) {
      const candidate = parse(getComputedStyle(ancestor).backgroundColor);
      if (candidate.length >= 3 && (candidate.length === 3 || candidate[3] >= 0.99)) { background = candidate; break; }
      ancestor = ancestor.parentElement;
    }
    if (!background.length) throw new Error('No opaque background found for heading contrast check.');
    const foreground = luminance(parse(getComputedStyle(element).color));
    const backdrop = luminance(background);
    return { ratio: (Math.max(foreground, backdrop) + 0.05) / (Math.min(foreground, backdrop) + 0.05), backgroundLuminance: backdrop };
  });
}

test('mobile guest can read offline, retain notes/status/cards, and read both themes', async ({ page, context }, testInfo) => {
  // Keep this smoke test isolated from production Firebase and OpenAI. Guest actions stay local.
  await isolateCloud(page);
  const crashes: string[] = [];
  page.on('pageerror', error => crashes.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^Fächer/ })).toBeVisible();
  const glossaryCard = page.getByRole('button', { name: /^Begriffsglossar/ });
  await expect(glossaryCard).toBeVisible();
  await expect(page.getByRole('button', { name: 'Anmelden / registrieren', exact: true })).toHaveCount(0);
  await expect(page.getByText(/Du nutzt myWik lokal als Gast/)).toHaveCount(0);
  await expect(page.getByText('DEIN WISSEN. DEIN TEMPO.', { exact: true })).toHaveCount(0);
  const glossarySurface = await glossaryCard.evaluate(element => ({ background: getComputedStyle(element).backgroundColor, radius: parseFloat(getComputedStyle(element).borderRadius) }));
  expect(glossarySurface.background).not.toBe('rgba(0, 0, 0, 0)');
  expect(glossarySurface.radius).toBeGreaterThanOrEqual(10);
  await openDeckungsbeitrag(page);

  await page.getByText('variablen Kosten', { exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText('Variable Kosten', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Im Glossar öffnen', exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('mobile-glossary.png'), fullPage: true, animations: 'disabled' });
  await page.getByRole('button', { name: 'Begriff schließen', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeHidden();

  await page.getByRole('button', { name: 'Offen', exact: true }).click();
  await page.getByRole('button', { name: 'Abgeschlossen', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Abgeschlossen', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Notiz', exact: true }).first().click();
  await expect(page.getByRole('dialog').filter({ has: page.getByRole('textbox', { name: 'Notiztext', exact: true }) })).toBeVisible();
  await page.getByRole('textbox', { name: 'Notiztext', exact: true }).fill('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.');
  await page.getByRole('button', { name: 'Notiz speichern', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Notiztext', exact: true })).toBeHidden();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByText('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.', { exact: true })).toBeVisible();
  await expect(page.getByText('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.', { exact: true })).toHaveCSS('font-style', 'italic');

  // The loaded web bundle remains open. This checks offline interaction, not a service-worker reload.
  // Native offline cold-start is separately supported by the installed app bundle and local cache.
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Karte erstellen', exact: true }).first().click();
  // RN-web assigns the dialog role after its entrance animation and focus-trap handover.
  // Waiting for that accessible ready state avoids typing into a departing modal's focus trap.
  await expect(page.getByRole('dialog').filter({ has: page.getByRole('textbox', { name: 'Karteikarte Frage', exact: true }) })).toBeVisible();
  await page.getByRole('textbox', { name: 'Karteikarte Frage', exact: true }).fill('Was deckt der Deckungsbeitrag?');
  await expect(page.getByRole('textbox', { name: 'Karteikarte Frage', exact: true })).toHaveValue('Was deckt der Deckungsbeitrag?');
  await page.getByRole('textbox', { name: 'Karteikarte Antwort', exact: true }).fill('Zunächst die Fixkosten; darüber hinaus entsteht Gewinn.');
  await expect(page.getByRole('textbox', { name: 'Karteikarte Frage', exact: true })).toHaveValue('Was deckt der Deckungsbeitrag?');
  await expect(page.getByRole('textbox', { name: 'Karteikarte Antwort', exact: true })).toHaveValue('Zunächst die Fixkosten; darüber hinaus entsteht Gewinn.');
  await page.getByRole('button', { name: 'Im Lernfach speichern', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Karteikarte Frage', exact: true })).toBeHidden();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByText('Karteikarte im Lernfach gespeichert.', { exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('mobile-offline-article.png'), fullPage: true, animations: 'disabled' });
  await page.getByRole('button', { name: 'Zur Startseite', exact: true }).click();
  await page.getByRole('button', { name: /^Karteikarten/ }).click();
  await page.getByRole('button', { name: 'Rechnungswesen', exact: true }).click();
  await expect(page.getByText('Was deckt der Deckungsbeitrag?', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Antwort zeigen', exact: true }).click();
  await expect(page.getByText('Zunächst die Fixkosten; darüber hinaus entsteht Gewinn.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Karte bearbeiten', exact: true }).click();
  await expect(page.getByRole('dialog').filter({ has: page.getByRole('textbox', { name: 'Frage / Vorderseite', exact: true }) })).toBeVisible();
  await page.getByRole('textbox', { name: 'Frage / Vorderseite', exact: true }).fill('Wozu dient der Deckungsbeitrag?');
  await page.getByRole('button', { name: 'Speichern', exact: true }).click();
  await expect(page.getByText('Wozu dient der Deckungsbeitrag?', { exact: true })).toBeVisible();

  await expect.poll(() => page.evaluate(() => localStorage.getItem('mywik.user.v1.guest') ?? '')).toContain('Wozu dient der Deckungsbeitrag?');
  await context.setOffline(false);
  await page.reload();
  await expect(page.getByRole('button', { name: /^Fächer/ })).toBeVisible();
  await openDeckungsbeitrag(page);
  await expect(page.getByRole('button', { name: 'Abgeschlossen', exact: true })).toBeVisible();
  await expect(page.getByText('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Notiz bearbeiten', exact: true }).click();
  const noteEditor = page.getByRole('textbox', { name: 'Notiztext', exact: true });
  await expect(page.getByRole('dialog').filter({ has: noteEditor })).toBeVisible();
  page.once('dialog', dialog => dialog.dismiss());
  await page.getByRole('button', { name: 'Notiz löschen', exact: true }).click();
  await expect(noteEditor).toHaveValue('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('mywik.user.v1.guest') ?? '')).toContain('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.');
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Notiz löschen', exact: true }).click();
  await expect(noteEditor).toBeHidden();
  await expect(page.getByText('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.', { exact: true })).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('mywik.user.v1.guest') ?? '')).not.toContain('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.');
  await page.getByRole('button', { name: 'Zur Startseite', exact: true }).click();
  await page.getByRole('button', { name: /^Karteikarten/ }).click();
  await page.getByRole('button', { name: 'Rechnungswesen', exact: true }).click();
  await expect(page.getByText('Wozu dient der Deckungsbeitrag?', { exact: true })).toBeVisible();

  for (const [label, theme] of [['Hell', 'light'], ['Dunkel', 'dark']] as const) {
    await page.getByRole('button', { name: 'Einstellungen', exact: true }).click();
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.getByRole('button', { name: 'Zur Startseite', exact: true }).click();
    const heading = page.getByRole('button', { name: /^Fächer/ }).getByText('Fächer', { exact: true });
    const contrast = await textContrast(heading);
    expect(contrast.ratio).toBeGreaterThanOrEqual(7);
    if (theme === 'light') expect(contrast.backgroundLuminance).toBeGreaterThan(0.7);
    else expect(contrast.backgroundLuminance).toBeLessThan(0.1);
    await page.screenshot({ path: testInfo.outputPath(`mobile-home-${theme}.png`), fullPage: true, animations: 'disabled' });
  }
  expect(crashes).toEqual([]);
});

test('prefilled article card editor retains actual keyboard edits to both fields', async ({ page, context }) => {
  await isolateCloud(page);
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^Fächer/ })).toBeVisible();
  await openDeckungsbeitrag(page);
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Karte erstellen', exact: true }).first().click();
  const front = page.getByRole('textbox', { name: 'Karteikarte Frage', exact: true });
  const back = page.getByRole('textbox', { name: 'Karteikarte Antwort', exact: true });
  await expect(page.getByRole('dialog').filter({ has: front })).toBeVisible();
  await front.click();
  await front.press('ControlOrMeta+A');
  await front.pressSequentially('Frage mit Tastatureingabe', { delay: 10 });
  await expect(front).toHaveValue('Frage mit Tastatureingabe');
  await back.click();
  await back.press('ControlOrMeta+A');
  await back.pressSequentially('Antwort mit Tastatureingabe', { delay: 10 });
  await expect(front).toHaveValue('Frage mit Tastatureingabe');
  await expect(back).toHaveValue('Antwort mit Tastatureingabe');
  await page.getByRole('button', { name: 'Im Lernfach speichern', exact: true }).click();
  await expect(front).toBeHidden();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('mywik.user.v1.guest') ?? '')).toContain('Frage mit Tastatureingabe');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('mywik.user.v1.guest') ?? '')).toContain('Antwort mit Tastatureingabe');
});


test('compact article actions stay on one row at 320px and preserve half-width gutters', async ({ page }) => {
  await isolateCloud(page);
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^Fächer/ })).toBeVisible();
  await openDeckungsbeitrag(page);
  const heading = await page.getByText('Der Deckungsbeitrag', { exact: true }).boundingBox();
  expect(heading).not.toBeNull();
  expect(heading!.x).toBeGreaterThanOrEqual(10);
  expect(heading!.x).toBeLessThanOrEqual(12);
  const note = page.getByRole('button', { name: 'Notiz', exact: true }).first();
  await note.scrollIntoViewIfNeeded();
  const boxes = await Promise.all([
    note.boundingBox(),
    page.getByRole('button', { name: 'Karte erstellen', exact: true }).first().boundingBox(),
    page.getByRole('button', { name: 'MeiWik fragen', exact: true }).first().boundingBox(),
  ]);
  const chatButton = await page.getByRole('button', { name: 'MeiWik Chat öffnen', exact: true }).boundingBox();
  expect(chatButton).not.toBeNull();
  boxes.forEach(box => {
    expect(box).not.toBeNull();
    expect(Math.abs(box!.y - boxes[0]!.y)).toBeLessThan(2);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.x).toBeGreaterThanOrEqual(10);
    expect(box!.x + box!.width).toBeLessThanOrEqual(310);
    const overlapsChat = box!.x < chatButton!.x + chatButton!.width && box!.x + box!.width > chatButton!.x && box!.y < chatButton!.y + chatButton!.height && box!.y + box!.height > chatButton!.y;
    expect(overlapsChat).toBe(false);
  });
  await expect(page.getByText(/Beispielinhalt|Vorläufige Themenstruktur|Kapitel vorbereitet/)).toHaveCount(0);
});
