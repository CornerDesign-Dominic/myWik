import { expect, test, type Locator, type Page } from '@playwright/test';

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
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return ['127.0.0.1', 'localhost'].includes(url.hostname) || ['data:', 'blob:'].includes(url.protocol)
      ? route.continue()
      : route.abort();
  });
  const crashes: string[] = [];
  page.on('pageerror', error => crashes.push(error.message));
  await page.goto('/');
  await expect(page.getByText('Schön, dass du da bist.', { exact: true })).toBeVisible();
  await openDeckungsbeitrag(page);

  await page.getByText('variablen Kosten', { exact: true }).click();
  await expect(page.getByText('Variable Kosten', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Im Glossar öffnen', exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('mobile-glossary.png'), fullPage: true });
  await page.getByRole('button', { name: 'Begriff schließen', exact: true }).click();

  await page.getByRole('button', { name: 'Offen', exact: true }).click();
  await page.getByRole('button', { name: 'Abgeschlossen', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Abgeschlossen', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Notiz', exact: true }).first().click();
  await page.getByRole('textbox', { name: 'Notiztext', exact: true }).fill('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.');
  await page.getByRole('button', { name: 'Notiz speichern', exact: true }).click();
  await expect(page.getByText('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.', { exact: true })).toBeVisible();

  // The loaded web bundle remains open. This checks offline interaction, not a service-worker reload.
  // Native offline cold-start is separately supported by the installed app bundle and local cache.
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Karte erstellen', exact: true }).first().click();
  await page.getByRole('textbox', { name: 'Karteikarte Frage', exact: true }).fill('Was deckt der Deckungsbeitrag?');
  await page.getByRole('textbox', { name: 'Karteikarte Antwort', exact: true }).fill('Zunächst die Fixkosten; darüber hinaus entsteht Gewinn.');
  await expect(page.getByRole('textbox', { name: 'Karteikarte Frage', exact: true })).toHaveValue('Was deckt der Deckungsbeitrag?');
  await expect(page.getByRole('textbox', { name: 'Karteikarte Antwort', exact: true })).toHaveValue('Zunächst die Fixkosten; darüber hinaus entsteht Gewinn.');
  await page.getByRole('button', { name: 'Im Lernfach speichern', exact: true }).click();
  await expect(page.getByText('Karteikarte im Lernfach gespeichert.', { exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('mobile-offline-article.png'), fullPage: true });
  await page.getByRole('button', { name: 'Zur Startseite', exact: true }).click();
  await page.getByRole('button', { name: /^Karteikarten/ }).click();
  await page.getByRole('button', { name: 'Rechnungswesen', exact: true }).click();
  await expect(page.getByText('Was deckt der Deckungsbeitrag?', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Antwort zeigen', exact: true }).click();
  await expect(page.getByText('Zunächst die Fixkosten; darüber hinaus entsteht Gewinn.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Karte bearbeiten', exact: true }).click();
  await page.getByRole('textbox', { name: 'Frage / Vorderseite', exact: true }).fill('Wozu dient der Deckungsbeitrag?');
  await page.getByRole('button', { name: 'Speichern', exact: true }).click();
  await expect(page.getByText('Wozu dient der Deckungsbeitrag?', { exact: true })).toBeVisible();

  await expect.poll(() => page.evaluate(() => localStorage.getItem('mywik.user.v1.guest') ?? '')).toContain('Wozu dient der Deckungsbeitrag?');
  await context.setOffline(false);
  await page.reload();
  await expect(page.getByText('Schön, dass du da bist.', { exact: true })).toBeVisible();
  await openDeckungsbeitrag(page);
  await expect(page.getByRole('button', { name: 'Abgeschlossen', exact: true })).toBeVisible();
  await expect(page.getByText('Meine Testnotiz: Fixkosten erst vom Gesamtdeckungsbeitrag abziehen.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Zur Startseite', exact: true }).click();
  await page.getByRole('button', { name: /^Karteikarten/ }).click();
  await page.getByRole('button', { name: 'Rechnungswesen', exact: true }).click();
  await expect(page.getByText('Wozu dient der Deckungsbeitrag?', { exact: true })).toBeVisible();

  for (const [label, theme] of [['Hell', 'light'], ['Dunkel', 'dark']] as const) {
    await page.getByRole('button', { name: 'Einstellungen', exact: true }).click();
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.getByRole('button', { name: 'Zur Startseite', exact: true }).click();
    const heading = page.getByText('Schön, dass du da bist.', { exact: true });
    const contrast = await textContrast(heading);
    expect(contrast.ratio).toBeGreaterThanOrEqual(7);
    if (theme === 'light') expect(contrast.backgroundLuminance).toBeGreaterThan(0.7);
    else expect(contrast.backgroundLuminance).toBeLessThan(0.1);
    await page.screenshot({ path: testInfo.outputPath(`mobile-home-${theme}.png`), fullPage: true });
  }
  expect(crashes).toEqual([]);
});
