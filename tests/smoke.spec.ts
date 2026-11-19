import { expect, test, type Locator, type Page } from '@playwright/test';
import {articles as fixtureArticles,subjects as fixtureSubjects,chapters as fixtureChapters,glossary as fixtureGlossary,contentVersion as fixtureVersion} from '../src/data/content';
import { catalogueCopies, catalogueIndex, scaledCatalogue } from './catalogueFixture';
import { androidReleasesApi, androidReleasesUrl } from '../src/services/androidUpdates';
import { expo as appConfig } from '../app.json';

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

async function openSettings(page: Page) {
  await page.getByRole('tab', { name: 'Start', exact: true }).click();
  await page.getByRole('button', { name: 'Einstellungen', exact: true }).click();
}

async function openDeckungsbeitrag(page: Page) {
  await page.getByRole('tab', { name: 'Start', exact: true }).click();
  await page.getByRole('button', { name: /^Fächer/ }).click();
  await page.getByRole('button', { name: /^Rechnungswesen,/ }).click();
  await page.getByRole('button', { name: /^1 Grundlegende Aspekte des Rechnungswesens/ }).click();
  await page.getByRole('button', { name: /^2 Finanzbuchhaltung/ }).click();
  await page.getByRole('button', { name: /^3\.3 Kostenstellenrechnung/ }).click();
  await page.getByRole('button', { name: /^3\.4 Kostenträgerzeit-/ }).click();
  await page.getByRole('button', { name: /3\.5\.2 Deckungsbeitrag/ }).click();
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
  await page.getByRole('tab', { name: 'Start', exact: true }).click();
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
  await page.getByRole('tab', { name: 'Start', exact: true }).click();
  await page.getByRole('button', { name: /^Karteikarten/ }).click();
  await page.getByRole('button', { name: 'Rechnungswesen', exact: true }).click();
  await expect(page.getByText('Wozu dient der Deckungsbeitrag?', { exact: true })).toBeVisible();

  for (const [label, theme] of [['Hell', 'light'], ['Dunkel', 'dark']] as const) {
    await openSettings(page);
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.getByRole('tab', { name: 'Start', exact: true }).click();
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
  const articleIntro = await page.getByText(/Was bleibt von einem Verkauf übrig/).boundingBox();
  expect(articleIntro).not.toBeNull();
  expect(articleIntro!.x).toBeGreaterThanOrEqual(10);
  expect(articleIntro!.x).toBeLessThanOrEqual(12);
  const note = page.getByRole('button', { name: 'Notiz', exact: true }).first();
  await note.scrollIntoViewIfNeeded();
  const boxes = await Promise.all([
    note.boundingBox(),
    page.getByRole('button', { name: 'Karte erstellen', exact: true }).first().boundingBox(),
    page.getByRole('button', { name: 'MeiWik fragen', exact: true }).first().boundingBox(),
  ]);
  const chatButton = await page.getByRole('tab', { name: 'MeiWik', exact: true }).boundingBox();
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


test('chat keeps its composer in a short viewport and dismisses input focus on send', async ({ page }) => {
  await isolateCloud(page);
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^Fächer/ })).toBeVisible();
  await openDeckungsbeitrag(page);
  await page.getByRole('tab', { name: 'MeiWik', exact: true }).click();
  const input = page.getByRole('textbox', { name: 'Frage an MeiWik', exact: true });
  await expect(page.getByRole('dialog').filter({ has: input })).toBeVisible();
  await input.fill('Wie berechne ich den Deckungsbeitrag?');
  await expect(input).toBeFocused();

  // A shorter browser viewport checks the constrained layout, not a native keyboard.
  await page.setViewportSize({ width: 393, height: 400 });
  const send = page.getByRole('button', { name: 'An MeiWik senden', exact: true });
  for (const control of [input, send]) {
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(400);
  }
  await send.click();
  await expect(input).not.toBeFocused();
  // Guest rejection exercises the send action without contacting the live backend.
  await expect(page.getByText('Bitte unter Einstellungen anmelden. MeiWik benötigt ein persönliches Konto.', { exact: true })).toBeVisible();
  await expect(input).toHaveValue('Wie berechne ich den Deckungsbeitrag?');
  await input.focus();
  await page.getByRole('button', { name: 'Chat verkleinern', exact: true }).click();
  await expect(input).toBeHidden();
  await page.setViewportSize({ width: 393, height: 851 });
  await page.getByRole('tab', { name: 'MeiWik', exact: true }).click();
  await expect(page.getByRole('dialog').filter({ has: input })).toBeVisible();
  await expect(input).not.toBeFocused();
  await expect(input).toHaveValue('Wie berechne ich den Deckungsbeitrag?');
});


test('chat formats saved answers safely in light/dark and narrow screens', async ({ page }) => {
  await isolateCloud(page);
  await page.addInitScript(() => {
    const now = Date.now();
    localStorage.setItem('@mywik/chat/v1/guest/deckungsbeitrag', JSON.stringify({ articleId: 'deckungsbeitrag', summary: '', updatedAt: now, expiresAt: now + 3600000, messages: [{ id: 'answer', role: 'assistant', createdAt: now, content: '## Merksatz\n\nDer **Deckungsbeitrag** deckt *Fixkosten*.\n\n4. **Recherchieren:** Informationen suchen.\n5. **Reflexion:** Ergebnis prüfen.\n\n> 80 − 35 = 45 €\n\n| Preis | Kosten |\n| --- | --- |\n| 80 € | 35 € |\n\n[Quelle](https://example.com) ![Kein Abruf](https://example.com/tracker.png)\n\n<script>alert(1)</script>' }] }));
  });
  const crashes: string[] = [];
  page.on('pageerror', e => crashes.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^Fächer/ })).toBeVisible();
  await openDeckungsbeitrag(page);
  for (const width of [320, 393]) {
    await page.setViewportSize({ width, height: 650 });
    await page.getByRole('tab', { name: 'MeiWik', exact: true }).click();
    const dialog = page.getByRole('dialog').filter({ has: page.getByRole('textbox', { name: 'Frage an MeiWik' }) });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Merksatz' })).toHaveCount(1);
    await expect(dialog.getByText('Deckungsbeitrag', { exact: true })).toHaveCSS('font-weight', '700');
    await expect(dialog.getByText('Fixkosten', { exact: true })).toHaveCSS('font-style', 'italic');
    await expect(dialog.getByText('Recherchieren:', { exact: true })).toHaveCSS('font-weight', '700');
    await expect(dialog.getByText('**Deckungsbeitrag**', { exact: true })).toHaveCount(0);
    await expect(dialog.locator('script, iframe, img[src*="example.com"], a[href]')).toHaveCount(0);
    expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.getByRole('button', { name: 'Chat verkleinern', exact: true }).click();
    if (width === 320) {
      await openSettings(page);
      await page.getByRole('button', { name: 'Hell', exact: true }).click();
      await openDeckungsbeitrag(page);
    }
  }
  expect(crashes).toEqual([]);
});


async function seedPracticeCards(page: Page, uid = 'guest') {
  await page.addInitScript(({ uid }) => {
    const now=Date.now();
    const entries: Record<string, unknown>={};
    for (const [id,front,back] of [['one','Was ist der Deckungsbeitrag?','Erlös minus variable Kosten.'],['two','Was ist die Gewinnschwelle?','Erlöse und Kosten sind gleich hoch.']]) {
      entries[`card_${id}`]={kind:'card',entityId:id,value:{id,subjectId:'rechnungswesen',front,back,updatedAt:now,nextReviewAt:now-1000,reviews:0},updatedAt:now,revision:`rev-${id}`,deleted:false};
    }
    localStorage.setItem(`mywik.user.v1.${uid}`,JSON.stringify({schema:1,entries,outbox:{}}));
  },{uid});
}
async function openPracticeCards(page: Page) {
  await page.getByRole('tab', { name: 'Start', exact: true }).click();
  await page.getByRole('button',{name:/^Karteikarten/}).click();
  await page.getByRole('button',{name:'Rechnungswesen',exact:true}).click();
  await expect(page.getByRole('button',{name:'Antwort zeigen',exact:true})).toBeVisible();
}
async function mockLearnerLogin(page: Page, uid='local-practice-test') {
  const token=[{alg:'none'},{sub:uid,user_id:uid,aud:'meiwik',iss:'https://securetoken.google.com/meiwik',iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+3600,email:'learner@example.invalid',firebase:{sign_in_provider:'password'}}].map(x=>Buffer.from(JSON.stringify(x)).toString('base64url')).join('.')+'.test';
  await page.route('https://identitytoolkit.googleapis.com/**',route=>route.fulfill({json:route.request().url().includes('accounts:lookup')?{users:[{localId:uid,email:'learner@example.invalid',emailVerified:false,providerUserInfo:[]}]}:{localId:uid,email:'learner@example.invalid',idToken:token,refreshToken:'test-refresh-token',expiresIn:'3600',registered:true},headers:{'access-control-allow-origin':'*'}}));
  await openSettings(page);
  await page.getByRole('textbox',{name:'E-Mail',exact:true}).fill('learner@example.invalid');
  await page.getByRole('textbox',{name:'Passwort',exact:true}).fill('test-password-only');
  await page.getByRole('button',{name:'Anmelden',exact:true}).click();
  await expect(page.getByRole('button',{name:/^Fächer/})).toBeVisible();
}

test('offline cards count only explicit ratings, preserve counters and allow resetting the schedule',async({page,context})=>{
  await isolateCloud(page);await seedPracticeCards(page);await page.goto('/');
  await openPracticeCards(page);await context.setOffline(true);
  await page.getByRole('button',{name:'Nächste Karte (überspringen)',exact:true}).click();
  await expect(page.getByText('0× gewusst · 0× nicht gewusst',{exact:true}).first()).toBeVisible();
  await page.getByRole('button',{name:'Antwort zeigen',exact:true}).click();
  await page.getByRole('button',{name:'Wusste ich nicht',exact:true}).click();
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.guest')!).entries.card_two.value.unknownCount)).toBe(1);
  await page.getByRole('button',{name:'Antwort zeigen',exact:true}).click();
  await page.getByRole('button',{name:'Wusste ich',exact:true}).click();
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.guest')!).entries.card_one.value.knownCount)).toBe(1);
  await page.getByRole('button',{name:'Was ist der Deckungsbeitrag?',exact:true}).click();
  await page.getByRole('button',{name:'Karte bearbeiten',exact:true}).click();
  await page.getByRole('textbox',{name:'Frage / Vorderseite',exact:true}).fill('Wie berechnet sich der Stückdeckungsbeitrag?');
  await page.getByRole('switch',{name:'Wiederholungsabstand zurücksetzen',exact:true}).click();
  await page.getByRole('button',{name:'Speichern',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.guest')!).entries.card_one.value);
  expect(saved.knownCount).toBe(1);expect(saved.successStreak).toBe(0);expect(saved.nextReviewAt).toBeLessThanOrEqual(Date.now()+1000);
});

test('manual duplicate warning allows editing the existing card or deliberately saving another',async({page})=>{
  await isolateCloud(page);await seedPracticeCards(page);await page.goto('/');await openPracticeCards(page);
  await page.getByRole('button',{name:'Karte hinzufügen',exact:true}).click();
  await page.getByRole('textbox',{name:'Frage / Vorderseite',exact:true}).fill('Was ist der Deckungsbeitrag?');
  await page.getByRole('textbox',{name:'Antwort / Rückseite',exact:true}).fill('Umsatz abzüglich variabler Kosten.');
  await page.getByRole('button',{name:'Speichern',exact:true}).click();
  await expect(page.getByText('Ähnliche Karten bestehen bereits:',{exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:/^Vorhandene Karte bearbeiten:/})).toBeVisible();
  await page.getByRole('button',{name:'Bewusst zusätzlich speichern',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByRole('button',{name:'Alle (3)',exact:true})).toBeVisible();
});

test('practice feedback never rates cards and its chat is discarded on card change',async({page})=>{
  await isolateCloud(page);await seedPracticeCards(page,'local-practice-test');
  const requests: Array<Record<string,unknown>>=[];
  await page.route('https://europe-west1-meiwik.cloudfunctions.net/meiwik',async route=>{
    if(route.request().method()==='OPTIONS'){await route.fulfill({status:204,headers:{'access-control-allow-origin':'*','access-control-allow-headers':'authorization,content-type','access-control-allow-methods':'POST'}});return;}
    const body=route.request().postDataJSON().data;requests.push(body);
    await route.fulfill({json:{data:{reply:'Das war falsch. Der Deckungsbeitrag ist Erlös minus variable Kosten.'}},headers:{'access-control-allow-origin':'*'}});
  });
  await page.goto('/');await mockLearnerLogin(page);await openPracticeCards(page);
  await page.getByRole('button',{name:'Mit MeiWik üben',exact:true}).click();
  const input=page.getByRole('textbox',{name:'Meine Antwort auf die Karte',exact:true});
  await input.fill('Nur die Fixkosten.');
  await page.getByRole('button',{name:'Antwort mit MeiWik besprechen',exact:true}).click();
  await expect(page.getByText(/Das war falsch/)).toBeVisible();
  expect(requests[0].action).toBe('practice');
  await expect(input).not.toBeFocused();
  let snapshot=await page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.local-practice-test')!));
  expect(snapshot.entries.card_one.value.reviews).toBe(0);
  await page.getByRole('button',{name:'Antwort zeigen',exact:true}).click();
  // The learner may explicitly choose "known" even after negative AI feedback.
  await page.getByRole('button',{name:'Wusste ich',exact:true}).click();
  await expect(page.getByText(/Das war falsch/)).toHaveCount(0);
  await page.getByRole('button',{name:'Was ist der Deckungsbeitrag?',exact:true}).click();
  await page.getByRole('button',{name:'Mit MeiWik üben',exact:true}).click();
  await expect(input).toHaveValue('');await expect(page.getByText(/Das war falsch/)).toHaveCount(0);
  snapshot=await page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.local-practice-test')!));
  expect(snapshot.entries.card_one.value.knownCount).toBe(1);
  expect(JSON.stringify(snapshot)).not.toContain('Nur die Fixkosten.');
  expect(JSON.stringify(snapshot)).not.toContain('Das war falsch');
});


test('AI creation uses edited drafts and saves selected suggestions together without provenance labels',async({page})=>{
  await isolateCloud(page);await seedPracticeCards(page,'local-practice-test');
  const requests: Array<Record<string,unknown>>=[];
  await page.route('https://europe-west1-meiwik.cloudfunctions.net/meiwik',async route=>{
    const data=route.request().postDataJSON().data;requests.push(data);
    await route.fulfill({json:{data:data.action==='flashcards'?{cards:[{front:'Wie berechnet man das Betriebsergebnis?',back:'Gesamtdeckungsbeitrag minus Fixkosten.'},{front:'Wann entsteht Gewinn?',back:'Wenn der Gesamtdeckungsbeitrag die Fixkosten übersteigt.'}]}:{duplicateIds:[]}},headers:{'access-control-allow-origin':'*'}});
  });
  await page.goto('/');await mockLearnerLogin(page);await openDeckungsbeitrag(page);
  await page.getByRole('button',{name:'Karte erstellen',exact:true}).first().click();
  const front=page.getByRole('textbox',{name:'Karteikarte Frage',exact:true});
  await front.fill('Meine konkretisierte Frage?');
  await page.getByRole('button',{name:'Mit MeiWik formulieren',exact:true}).click();
  await expect(page.getByRole('checkbox',{name:'Vorschlag 1: Wie berechnet man das Betriebsergebnis?',exact:true})).toBeVisible();
  expect((requests[0].card as {front:string}).front).toBe('Meine konkretisierte Frage?');
  expect(requests[0].generationMode).toBe('improve');
  expect(requests[0].sectionId).toBe('definition');
  expect((requests[0].existingCards as unknown[]).length).toBe(2);
  await expect(page.getByText('MeiWik-Vorschlag',{exact:true})).toHaveCount(0);
  const first=page.getByRole('checkbox',{name:'Vorschlag 1: Wie berechnet man das Betriebsergebnis?',exact:true});
  const second=page.getByRole('checkbox',{name:'Vorschlag 2: Wann entsteht Gewinn?',exact:true});
  await expect(first).not.toBeChecked();await expect(second).not.toBeChecked();
  await expect(page.getByRole('button',{name:'Auswahl übernehmen (0)',exact:true})).toBeDisabled();
  await first.click();await expect(first).toBeChecked();
  await expect(page.getByRole('button',{name:'Auswahl übernehmen (1)',exact:true})).toBeEnabled();
  await page.getByRole('button',{name:'Alle auswählen',exact:true}).click();
  await expect(first).toBeChecked();await expect(second).toBeChecked();
  await page.getByRole('button',{name:'Auswahl aufheben',exact:true}).click();
  await expect(first).not.toBeChecked();await expect(second).not.toBeChecked();
  await first.click();await second.click();
  await page.getByRole('button',{name:'Auswahl übernehmen (2)',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.local-practice-test')!).entries);
  const proposals=Object.values(saved).filter((entry:any)=>entry.kind==='card'&&!entry.deleted&&['Wie berechnet man das Betriebsergebnis?','Wann entsteht Gewinn?'].includes(entry.value.front)) as Array<{value:{subjectId:string;front:string}}>;
  expect(proposals).toHaveLength(2);expect(proposals.every(entry=>entry.value.subjectId==='rechnungswesen')).toBe(true);
  await openPracticeCards(page);
  await expect(page.getByRole('button',{name:'Alle (4)',exact:true})).toBeVisible();
});

test('late practice feedback is ignored after a card switch and offline fallback still allows self assessment',async({page,context})=>{
  await isolateCloud(page);await seedPracticeCards(page,'local-practice-test');
  let reply: (()=>void)|undefined;
  await page.route('https://europe-west1-meiwik.cloudfunctions.net/meiwik',async route=>{
    await new Promise<void>(resolve=>{reply=resolve});
    await route.fulfill({json:{data:{reply:'VERSCHWUNDENE ALTE RÜCKMELDUNG'}},headers:{'access-control-allow-origin':'*'}});
  });
  await page.goto('/');await mockLearnerLogin(page);await openPracticeCards(page);
  await page.getByRole('button',{name:'Mit MeiWik üben',exact:true}).click();
  await page.getByRole('textbox',{name:'Meine Antwort auf die Karte',exact:true}).fill('Meine erste Antwort');
  await page.getByRole('button',{name:'Antwort mit MeiWik besprechen',exact:true}).click();
  await expect.poll(()=>!!reply).toBe(true);
  await page.getByRole('button',{name:'Nächste Karte (überspringen)',exact:true}).click();
  reply!();
  await page.getByRole('button',{name:'Mit MeiWik üben',exact:true}).click();
  await expect(page.getByRole('textbox',{name:'Meine Antwort auf die Karte',exact:true})).toHaveValue('');
  await expect(page.getByText('VERSCHWUNDENE ALTE RÜCKMELDUNG',{exact:true})).toHaveCount(0);
  await context.setOffline(true);
  await expect(page.getByText(/MeiWik ist offline. Du kannst die Karte trotzdem/)).toBeVisible();
  await page.getByRole('button',{name:'Antwort zeigen',exact:true}).click();
  await page.getByRole('button',{name:'Wusste ich nicht',exact:true}).click();
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.local-practice-test')!).entries.card_two.value.unknownCount)).toBe(1);
});


test('guest and two accounts remain isolated across sign out, storage failure and returning login',async({page,context})=>{
 await isolateCloud(page);
 for(const uid of ['guest','alice','bob'])await seedPracticeCards(page,uid);
 await page.addInitScript(()=>{
  for(const uid of ['guest','alice','bob']){const key=`mywik.user.v1.${uid}`;const s=JSON.parse(localStorage.getItem(key)!);s.entries.card_one.value.front=`Private Frage ${uid}?`;localStorage.setItem(key,JSON.stringify(s));}
  const original=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,value){if((window as unknown as {failOwner?:string}).failOwner&&key===`mywik.user.v1.${(window as unknown as {failOwner?:string}).failOwner}`)throw new DOMException('Storage full','QuotaExceededError');return original.call(this,key,value)};
 });
 await page.goto('/');await openPracticeCards(page);
 await expect(page.getByText('Private Frage guest?',{exact:true}).first()).toBeVisible();
 await mockLearnerLogin(page,'alice');await openPracticeCards(page);
 await expect(page.getByText('Private Frage alice?',{exact:true}).first()).toBeVisible();
 await expect(page.getByText('Private Frage guest?',{exact:true})).toHaveCount(0);
 await page.getByRole('button',{name:'Karte bearbeiten',exact:true}).click();
 await page.getByRole('textbox',{name:'Frage / Vorderseite',exact:true}).fill('Alice noch nicht gespeichert?');
 // Switch to offline to test storage independently of the mocked cloud transport.
 await context.setOffline(true);
 await page.evaluate(()=>{(window as unknown as {failOwner?:string}).failOwner='alice'});
 await expect(page.getByText(/Ohne KI-Verbindung werden ähnliche Formulierungen lokal geprüft/)).toBeVisible();
 // The comparison endpoint can fail; saving is still explicitly possible without AI.
 await page.getByRole('button',{name:'Speichern',exact:true}).click();
 const bypass=page.getByRole('button',{name:'Ohne KI-Prüfung speichern',exact:true});
 if(await bypass.isVisible())await bypass.click();
 // Durable card saves retain the editor and its draft when the device write fails.
 const editor=page.getByRole('dialog');
 await expect(editor).toBeVisible();
 await expect(editor.getByRole('textbox',{name:'Frage / Vorderseite',exact:true})).toHaveValue('Alice noch nicht gespeichert?');
 await expect(editor.getByRole('alert')).toBeVisible();
 await editor.getByRole('button',{name:'Schließen',exact:true}).click();
 await expect(page.getByRole('dialog')).toBeHidden();
 await expect(page.getByRole('button',{name:'Speichern erneut versuchen',exact:true})).toBeVisible();
 await openSettings(page);
 await page.getByRole('button',{name:'Abmelden',exact:true}).click();
 await expect(page.getByRole('button',{name:'Abmelden',exact:true})).toBeVisible();
 await page.evaluate(()=>{(window as unknown as {failOwner?:string}).failOwner=undefined});
 await page.getByRole('button',{name:'Speichern erneut versuchen',exact:true}).click();
 await expect(page.getByRole('button',{name:'Speichern erneut versuchen',exact:true})).toHaveCount(0);
 await page.getByRole('button',{name:'Abmelden',exact:true}).click();
 await expect(page.getByRole('button',{name:/^Fächer/})).toBeVisible();
 await openPracticeCards(page);await expect(page.getByText('Private Frage guest?',{exact:true}).first()).toBeVisible();
 await context.setOffline(false);
 await mockLearnerLogin(page,'bob');await openPracticeCards(page);
 await expect(page.getByText('Private Frage bob?',{exact:true}).first()).toBeVisible();
 await expect(page.getByText('Alice noch nicht gespeichert?',{exact:true})).toHaveCount(0);
 await openSettings(page);await page.getByRole('button',{name:'Abmelden',exact:true}).click();
 await expect(page.getByRole('button',{name:/^Fächer/})).toBeVisible();
 await mockLearnerLogin(page,'alice');await openPracticeCards(page);
 await expect(page.getByText('Alice noch nicht gespeichert?',{exact:true}).first()).toBeVisible();
});

test('corrupt local data stays untouched and can be retried without silently resetting the account',async({page})=>{
 await isolateCloud(page);await page.addInitScript(()=>localStorage.setItem('mywik.user.v1.guest','CORRUPT-DATA'));
 await page.goto('/');await expect(page.getByText(/Die lokalen Lerndaten konnten nicht gelesen werden/)).toBeVisible();
 expect(await page.evaluate(()=>localStorage.getItem('mywik.user.v1.guest'))).toBe('CORRUPT-DATA');
 await page.evaluate(()=>localStorage.setItem('mywik.user.v1.guest',JSON.stringify({schema:1,entries:{},outbox:{}})));
 await page.getByRole('button',{name:'Erneut laden',exact:true}).click();
 await expect(page.getByRole('button',{name:/^Fächer/})).toBeVisible();
});


test('private conflict copies can be restored under a new ID and never appear in another account',async({page})=>{
 await isolateCloud(page);await seedPracticeCards(page,'alice');
 await page.addInitScript(()=>{
  const key='mywik.user.v1.alice',s=JSON.parse(localStorage.getItem(key)!);
  const value={id:'deleted-note',articleId:'deckungsbeitrag',kind:'personal',text:'ALICE KONFLIKTKOPIE',updatedAt:10};
  s.conflicts={'conflict-a':{kind:'note',entityId:'deleted-note',value,updatedAt:10,revision:'conflict-a',deleted:false}};
  s.entries['note_deleted-note']={kind:'note',entityId:'deleted-note',value:null,updatedAt:11,revision:'deletion',deleted:true};
  localStorage.setItem(key,JSON.stringify(s));
 });
 await page.goto('/');await mockLearnerLogin(page,'alice');
 await openSettings(page);
 await expect(page.getByText('ALICE KONFLIKTKOPIE',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Als neue Kopie wiederherstellen',exact:true}).click();
 await expect(page.getByText('ALICE KONFLIKTKOPIE',{exact:true})).toHaveCount(0);
 const snapshot=await page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.alice')!));
 expect(snapshot.entries['note_deleted-note'].deleted).toBe(true);
 const restored=Object.values(snapshot.entries).find((e:any)=>e.kind==='note'&&!e.deleted) as {entityId:string;value:{text:string}};
 expect(restored.entityId).not.toBe('deleted-note');expect(restored.value.text).toBe('ALICE KONFLIKTKOPIE');
 await page.getByRole('button',{name:'Abmelden',exact:true}).click();
 await expect(page.getByRole('button',{name:/^Fächer/})).toBeVisible();
 await openSettings(page);
 await expect(page.getByText('ALICE KONFLIKTKOPIE',{exact:true})).toHaveCount(0);
 await expect(page.getByText('Gesicherte Konfliktversionen',{exact:true})).toHaveCount(0);
});


test('an answer started in account A cannot appear in account B after sign out',async({page})=>{
 await isolateCloud(page);await seedPracticeCards(page,'alice');await seedPracticeCards(page,'bob');
 let release: (()=>void)|undefined;
 await page.route('https://europe-west1-meiwik.cloudfunctions.net/meiwik',async route=>{
  await new Promise<void>(r=>{release=r});await route.fulfill({json:{data:{reply:'PRIVATE ANTWORT VON ALICE'}},headers:{'access-control-allow-origin':'*'}});
 });
 await page.goto('/');await mockLearnerLogin(page,'alice');await openPracticeCards(page);
 await page.getByRole('button',{name:'Mit MeiWik üben',exact:true}).click();
 await page.getByRole('textbox',{name:'Meine Antwort auf die Karte',exact:true}).fill('Private Eingabe von Alice');
 await page.getByRole('button',{name:'Antwort mit MeiWik besprechen',exact:true}).click();await expect.poll(()=>!!release).toBe(true);
 await openSettings(page);await page.getByRole('button',{name:'Abmelden',exact:true}).click();
 await expect(page.getByRole('button',{name:/^Fächer/})).toBeVisible();
 await mockLearnerLogin(page,'bob');release!();await openPracticeCards(page);
 await page.getByRole('button',{name:'Mit MeiWik üben',exact:true}).click();
 await expect(page.getByRole('textbox',{name:'Meine Antwort auf die Karte',exact:true})).toHaveValue('');
 await expect(page.getByText('PRIVATE ANTWORT VON ALICE',{exact:true})).toHaveCount(0);
 const bob=await page.evaluate(()=>localStorage.getItem('mywik.user.v1.bob'));
 expect(bob).not.toContain('Private Eingabe von Alice');expect(bob).not.toContain('PRIVATE ANTWORT VON ALICE');
});


async function recordedSeconds(page:Page) {
 return page.evaluate(()=>Object.values(JSON.parse(localStorage.getItem('mywik.user.v1.guest')??'{"entries":{}}').entries).reduce((n:number,e:any)=>n+(e.kind==='session'&&!e.deleted?e.value.seconds:0),0));
}
test('learning time stops at inactivity and does not backfill the idle gap on a new touch',async({page})=>{
 await isolateCloud(page);
 const start=new Date('2026-11-17T20:00:00+01:00');await page.clock.install({time:start});await page.clock.pauseAt(start);
 await page.goto('/');await openDeckungsbeitrag(page);
 await page.clock.runFor(190000);
 await expect.poll(()=>recordedSeconds(page)).toBe(120);
 await page.getByRole('tab', { name: 'MeiWik', exact: true }).tap();
 await page.clock.runFor(15000);
 await expect.poll(()=>recordedSeconds(page)).toBe(125);
 await page.getByRole('button',{name:'Chat verkleinern',exact:true}).click();
 await page.getByRole('tab', { name: 'Start', exact: true }).click();
 await expect.poll(()=>recordedSeconds(page)).toBe(135);
 const before=await recordedSeconds(page);await page.clock.runFor(60000);expect(await recordedSeconds(page)).toBe(before);
});

test('learning intervals crossing midnight are stored on both original local days',async({page})=>{
 await isolateCloud(page);
 const start=new Date('2026-11-17T23:59:50+01:00');await page.clock.install({time:start});await page.clock.pauseAt(start);
 await page.goto('/');await openDeckungsbeitrag(page);await page.clock.runFor(30000);
 const days=await page.evaluate(()=>Object.values(JSON.parse(localStorage.getItem('mywik.user.v1.guest')!).entries).reduce((out:Record<string,number>,e:any)=>{if(e.kind==='session'){out[e.value.day]=(out[e.value.day]??0)+e.value.seconds}return out},{}));
 expect(days['2026-11-17']).toBe(10);expect(days['2026-11-18']).toBe(20);
});

test('monthly statistics change totals and milestones together with the selected calendar',async({page})=>{
 await isolateCloud(page);await page.clock.install({time:new Date('2026-11-17T12:00:00+01:00')});
 await page.addInitScript(()=>{
  const s={schema:1,entries:{} as Record<string,unknown>,outbox:{}};
  for(const [id,day,seconds,kind] of [['oct','2026-10-31',3600,'article'],['nov','2026-11-17',600,'cards']] as const){s.entries[`session_${id}`]={kind:'session',entityId:id,value:{id,subjectId:'rechnungswesen',kind,seconds,day,startedAt:0},updatedAt:1,revision:id,deleted:false};s.entries[`visit_${day}`]={kind:'visit',entityId:day,value:day,updatedAt:1,revision:day,deleted:false};}
  localStorage.setItem('mywik.user.v1.guest',JSON.stringify(s));
 });
 await page.goto('/');await page.getByRole('button',{name:/^Deine Erfolge/}).click();
 await expect(page.getByText('November 2026',{exact:true})).toBeVisible();
 await expect(page.getByText('10 Min.',{exact:true})).toBeVisible();await expect(page.getByText('★ 0 Tagessterne',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'‹',exact:true}).click();
 await expect(page.getByText('Oktober 2026',{exact:true})).toBeVisible();await expect(page.getByText('1 h',{exact:true})).toBeVisible();await expect(page.getByText('★ 1 Tagessterne',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Aktueller Monat',exact:true}).click();await expect(page.getByText('10 Min.',{exact:true})).toBeVisible();
});


test('hidden views pause learning and card study cannot count article time twice',async({page})=>{
 await isolateCloud(page);await seedPracticeCards(page);
 const start=new Date('2026-11-17T20:00:00+01:00');await page.clock.install({time:start});await page.clock.pauseAt(start);
 await page.addInitScript(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>(window as unknown as {testHidden?:boolean}).testHidden??false})});
 await page.goto('/');await openDeckungsbeitrag(page);await page.clock.runFor(30000);await expect.poll(()=>recordedSeconds(page)).toBe(30);
 await page.evaluate(()=>{(window as unknown as {testHidden?:boolean}).testHidden=true;document.dispatchEvent(new Event('visibilitychange'))});await page.clock.runFor(180000);expect(await recordedSeconds(page)).toBe(30);
 await page.evaluate(()=>{(window as unknown as {testHidden?:boolean}).testHidden=false;document.dispatchEvent(new Event('visibilitychange'))});await page.clock.runFor(15000);await expect.poll(()=>recordedSeconds(page)).toBe(45);
 await openPracticeCards(page);await page.clock.runFor(30000);await page.getByRole('tab', { name: 'Start', exact: true }).click();
 await expect.poll(()=>recordedSeconds(page)).toBe(75);
 const categories=await page.evaluate(()=>Object.values(JSON.parse(localStorage.getItem('mywik.user.v1.guest')!).entries).reduce((out:Record<string,number>,e:any)=>{if(e.kind==='session')out[e.value.kind]=(out[e.value.kind]??0)+e.value.seconds;return out},{}));
 expect(categories.article).toBe(45);expect(categories.cards).toBe(30);
});

test('bookmark changes preserve progress history and reopening an article dismisses stale recommendations',async({page})=>{
 await isolateCloud(page);
 await page.addInitScript(()=>{
  const progress={articleId:'deckungsbeitrag',status:'done',starred:false,updatedAt:1,history:[{status:'unclear',at:0},{status:'done',at:1}]};
  const recommendation={id:'repeat_deckungsbeitrag_1',articleId:'deckungsbeitrag',subjectId:'rechnungswesen',title:'Alte Empfehlung',reason:'Vorheriger Abschluss',state:'open',dueAt:1,updatedAt:1};
  const entity=(kind:string,id:string,value:unknown)=>({kind,entityId:id,value,updatedAt:1,revision:id,deleted:false});
  localStorage.setItem('mywik.user.v1.guest',JSON.stringify({schema:1,entries:{progress_deckungsbeitrag:entity('progress','deckungsbeitrag',progress),recommendation_repeat_deckungsbeitrag_1:entity('recommendation','repeat_deckungsbeitrag_1',recommendation)},outbox:{}}));
 });
 await page.goto('/');await openDeckungsbeitrag(page);
 await page.getByRole('button',{name:'Als interessant merken',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.guest')!).entries.progress_deckungsbeitrag.value.starred)).toBe(true);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.guest')!).entries.progress_deckungsbeitrag.value.history.length)).toBe(2);
 await page.getByRole('button',{name:'Abgeschlossen',exact:true}).click();await page.getByRole('button',{name:'Weiterarbeiten',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('mywik.user.v1.guest')!).entries.recommendation_repeat_deckungsbeitrag_1.value.state)).toBe('dismissed');
});


test('glossary searches examples and umlaut spellings and retains context after visiting an article',async({page})=>{
 await isolateCloud(page);await page.goto('/');await page.getByRole('tab', { name: 'Suche', exact: true }).click();
 const search=page.getByRole('textbox',{name:'Glossar durchsuchen',exact:true});
 await search.fill('  vollstaendige  beruflichen  ');await page.getByRole('button',{name:'Vollständige Handlung',exact:true}).click();
 await expect(page.getByText(/Modell einer selbstständig bewältigten beruflichen Handlung/)).toBeVisible();
 await page.getByRole('button',{name:'Suche leeren',exact:true}).click();await search.fill('Hallenmiete');
 await page.getByRole('button',{name:'Fixkosten',exact:true}).click();await page.getByRole('button',{name:'Zum Artikel',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Der Deckungsbeitrag',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Zurück',exact:true}).click();await expect(search).toHaveValue('Hallenmiete');
 await expect(page.getByRole('button',{name:'Fixkosten',exact:true})).toHaveAttribute('aria-expanded','true');
 await search.fill('KeinTreffer123');await expect(page.getByText('Kein passender Begriff gefunden.',{exact:true})).toBeVisible();
});

async function articleScrollTop(page: Page) {
  return page.getByTestId('article-content').evaluate(element => element.scrollTop);
}

test('article reading position survives glossary navigation and legacy pixel positions still restore',async({page})=>{
 await isolateCloud(page);await page.addInitScript(()=>{if(!localStorage.getItem('mywik:reading:guest:deckungsbeitrag'))localStorage.setItem('mywik:reading:guest:deckungsbeitrag','900')});
 await page.goto('/');await openDeckungsbeitrag(page);
 await expect.poll(()=>articleScrollTop(page)).toBeGreaterThan(850);
 await page.getByRole('tab', { name: 'Suche', exact: true }).click();await expect(page.getByRole('heading',{name:'Begriffsglossar',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Zurück',exact:true}).click();await expect.poll(()=>articleScrollTop(page)).toBeGreaterThan(850);
 expect(await articleScrollTop(page)).toBeLessThan(1000);
});

test('article terms open the selected glossary entry and table of contents reaches the correct section',async({page})=>{
 await isolateCloud(page);await page.setViewportSize({width:320,height:800});await page.goto('/');await openDeckungsbeitrag(page);
 await page.getByText('variablen Kosten',{exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('button',{name:'Im Glossar öffnen',exact:true}).click();
 await expect(page.getByRole('button',{name:'Variable Kosten',exact:true})).toHaveAttribute('aria-expanded','true');
 await expect(page.getByRole('button',{name:'Zum Artikel',exact:true})).toBeInViewport();
 await page.getByRole('button',{name:'Zurück',exact:true}).click();
 await page.getByRole('button',{name:'In diesem Artikel',exact:true}).click();
 await page.getByRole('button',{name:'Typische Fehler vermeiden',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Typische Fehler vermeiden',exact:true})).toBeInViewport();
 await page.getByRole('tab',{name:'Formeln',exact:true}).click();await expect(page.getByRole('tab',{name:'Formeln',exact:true})).toHaveAttribute('aria-selected','true');
 await expect(page.getByText(/Stückdeckungsbeitrag: db = p − kv/)).toBeVisible();
});

test('notes from removed sections remain visible and editable',async({page})=>{
 await isolateCloud(page);await page.addInitScript(()=>{
  const value={id:'old-note',articleId:'deckungsbeitrag',sectionId:'removed-section:p0',text:'NOTIZ AUS FRÜHEREM ABSCHNITT',kind:'personal',updatedAt:1};
  localStorage.setItem('mywik.user.v1.guest',JSON.stringify({schema:1,entries:{'note_old-note':{kind:'note',entityId:'old-note',value,updatedAt:1,revision:'old-note',deleted:false}},outbox:{}}));
 });
 await page.goto('/');await openDeckungsbeitrag(page);
 await page.getByRole('button',{name:'Notiz zu früherem Abschnitt bearbeiten',exact:true}).click();
 await expect(page.getByRole('textbox',{name:'Notiztext',exact:true})).toHaveValue('NOTIZ AUS FRÜHEREM ABSCHNITT');
 await page.getByRole('textbox',{name:'Notiztext',exact:true}).fill('Weiterhin vorhandene persönliche Notiz');
 await page.getByRole('button',{name:'Notiz speichern',exact:true}).click();await expect(page.getByText('Weiterhin vorhandene persönliche Notiz',{exact:true})).toBeVisible();
});

test('repeated navigation does not stack duplicate screens and chapter folds survive returning from an article',async({page})=>{
 await isolateCloud(page);await page.goto('/');await page.getByRole('tab', { name: 'Suche', exact: true }).click();await page.getByRole('tab', { name: 'Suche', exact: true }).click();
 await page.getByRole('button',{name:'Zurück',exact:true}).click();await expect(page.getByRole('button',{name:/^Fächer/})).toBeVisible();
 await page.getByRole('button',{name:/^Fächer/}).click();await page.getByRole('button',{name:/^Rechnungswesen,/}).click();
 const partialCosting = page.getByRole('button', { name: /Vollkosten- und Teilkostenrechnung/ });
 await partialCosting.click();
 await page.getByRole('tab', { name: 'Suche', exact: true }).click();await page.getByRole('textbox',{name:'Glossar durchsuchen',exact:true}).fill('Deckungsbeitrag');await page.getByRole('button',{name:'Deckungsbeitrag',exact:true}).click();await page.getByRole('button',{name:'Zum Artikel',exact:true}).click();
 await page.getByRole('button',{name:'Zurück',exact:true}).click();await page.getByRole('button',{name:'Zurück',exact:true}).click();
 await expect(partialCosting).toHaveAttribute('aria-expanded','false');
 await page.getByRole('tab', { name: 'Start', exact: true }).click();await page.getByRole('button',{name:/^Fächer/}).click();await page.getByRole('button',{name:/^BWL,/}).click();
 await expect(page.getByText('Inhalt folgt',{exact:true}).first()).toBeVisible();
});


test('long glossary definitions scroll inside the popup without losing its actions',async({page})=>{
 await isolateCloud(page);await page.setViewportSize({width:320,height:640});
 const catalogue=JSON.parse(JSON.stringify({version:fixtureVersion+1,subjects:fixtureSubjects,chapters:fixtureChapters,articles:fixtureArticles,glossary:fixtureGlossary}));
 catalogue.glossary.find((t:any)=>t.id==='variable-kosten').definition='LANGE TESTDEFINITION. '+('Variable Kosten verändern sich mit der Ausbringungsmenge. '.repeat(100));
 await page.addInitScript(c=>localStorage.setItem('@mywik/catalogue/v1',JSON.stringify(c)),catalogue);
 await page.goto('/');await openDeckungsbeitrag(page);await page.getByText('variablen Kosten',{exact:true}).click();
 const dialog=page.getByRole('dialog');await expect(dialog.getByText(/LANGE TESTDEFINITION/)).toBeVisible();
 const action=page.getByRole('button',{name:'Im Glossar öffnen',exact:true});await action.scrollIntoViewIfNeeded();await expect(action).toBeInViewport();
 await action.click();await expect(page.getByRole('heading',{name:'Begriffsglossar',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Variable Kosten',exact:true})).toHaveAttribute('aria-expanded','true');
});

async function simulateSystemInsets(page: Page) {
  // Chromium cannot display Android's OS bars. Feed realistic CSS-env measurements
  // through the actual safe-area provider to exercise each modal's layout instead.
  await page.addInitScript(() => {
    type Insets = { top: number; right: number; bottom: number; left: number };
    const scope = window as typeof window & { mywikTestInsets?: Insets };
    scope.mywikTestInsets = { top: 24, right: 0, bottom: 48, left: 0 };
    const original = window.getComputedStyle.bind(window);
    window.getComputedStyle = (element: Element, pseudo?: string | null) => {
      const actual = original(element, pseudo);
      if (!(element instanceof HTMLElement) || !element.style.paddingTop.includes('safe-area-inset')) return actual;
      const sides: Record<string, keyof Insets> = { paddingTop: 'top', paddingRight: 'right', paddingBottom: 'bottom', paddingLeft: 'left' };
      return new Proxy(actual, { get(target, property) {
        if (typeof property === 'string' && sides[property]) return `${scope.mywikTestInsets![sides[property]]}px`;
        const value = Reflect.get(target, property, target);
        return typeof value === 'function' ? value.bind(target) : value;
      } });
    };
  });
}

test('the five shortcuts, page titles and home settings respect mobile safe areas', async ({ page }) => {
  await isolateCloud(page);
  await simulateSystemInsets(page);
  await page.goto('/');
  const header = page.getByTestId('page-header');
  const safeArea = page.getByTestId('bottom-safe-area');
  const menu = safeArea.getByRole('tablist', { name: 'Schnellmenü' });
  const tabs = menu.getByRole('tab');
  const tab = (name: string) => menu.getByRole('tab', { name, exact: true });
  await expect(tabs).toHaveText(['Start', 'Fächer', 'Suche', 'Karteikarten', 'MeiWik']);
  await expect(header.getByRole('heading', { name: 'Start', exact: true })).toBeVisible();
  await expect(tab('Start')).toHaveAttribute('aria-selected', 'true');
  await expect(tab('MeiWik').getByTestId('meiwik-app-icon')).toBeVisible();
  const settings = page.getByRole('button', { name: 'Einstellungen', exact: true });

  for (const scenario of [
    { width: 320, height: 650, insets: { top: 24, right: 0, bottom: 48, left: 0 } },
    { width: 393, height: 720, insets: { top: 47, right: 0, bottom: 34, left: 0 } },
    { width: 720, height: 393, insets: { top: 0, right: 48, bottom: 24, left: 24 } },
  ]) {
    await page.setViewportSize({ width: scenario.width, height: scenario.height });
    await page.evaluate(insets => {
      (window as typeof window & { mywikTestInsets?: typeof insets }).mywikTestInsets = insets;
      window.dispatchEvent(new Event('resize'));
    }, scenario.insets);
    await expect(safeArea).toHaveCSS('padding-bottom', `${scenario.insets.bottom}px`);
    const boxes = await Promise.all((await tabs.all()).map(item => item.boundingBox()));
    for (const [index, box] of boxes.entries()) {
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.x).toBeGreaterThanOrEqual(scenario.insets.left);
      expect(box!.x + box!.width).toBeLessThanOrEqual(scenario.width - scenario.insets.right + 1);
      expect(box!.y + box!.height).toBeLessThanOrEqual(scenario.height - scenario.insets.bottom + 1);
      if (index) expect(box!.x).toBeGreaterThan(boxes[index - 1]!.x);
    }
    const menuBox = await menu.boundingBox();
    const settingsBox = await settings.boundingBox();
    expect(settingsBox!.y + settingsBox!.height).toBeLessThanOrEqual(menuBox!.y + 1);
  }

  await settings.click();
  await expect(header.getByRole('heading', { name: 'Einstellungen', exact: true })).toBeVisible();
  await expect(settings).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Nach Updates schauen', exact: true })).toBeVisible();
  await tab('Suche').click();
  await expect(header.getByRole('heading', { name: 'Begriffsglossar', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Glossar durchsuchen', exact: true })).toBeVisible();
  await tab('Karteikarten').click();
  await expect(header.getByRole('heading', { name: 'Karteikarten', exact: true })).toBeVisible();
  await tab('MeiWik').click();
  await expect(header.getByRole('heading', { name: 'MeiWik', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Artikel auswählen', exact: true }).click();
  await expect(header.getByRole('heading', { name: 'Fächer', exact: true })).toBeVisible();
  await expect(tab('Fächer')).toHaveAttribute('aria-selected', 'true');
});

test('modal actions respect simulated three-button, gesture and landscape system insets', async ({ page }) => {
  await isolateCloud(page);
  await simulateSystemInsets(page);
  await page.goto('/');
  await expect(page.getByRole('button', { name: /^Fächer/ })).toBeVisible();
  await openDeckungsbeitrag(page);
  const scenarios = [
    { width: 393, height: 720, insets: { top: 24, right: 0, bottom: 48, left: 0 } },
    { width: 393, height: 650, insets: { top: 24, right: 0, bottom: 24, left: 0 } },
    { width: 720, height: 393, insets: { top: 0, right: 48, bottom: 24, left: 24 } },
  ];
  for (const scenario of scenarios) {
    await page.setViewportSize({ width: scenario.width, height: scenario.height });
    await page.evaluate(insets => {
      (window as typeof window & { mywikTestInsets?: typeof insets }).mywikTestInsets = insets;
      window.dispatchEvent(new Event('resize'));
    }, scenario.insets);
    const assertSafeAction = async (button: Locator) => {
      const safeArea = page.getByTestId('modal-safe-area');
      await expect(safeArea).toHaveCSS('padding-bottom', `${scenario.insets.bottom}px`);
      await expect(safeArea).toHaveCSS('padding-left', `${scenario.insets.left}px`);
      await expect(safeArea).toHaveCSS('padding-right', `${scenario.insets.right}px`);
      await button.scrollIntoViewIfNeeded();
      const box = await button.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(scenario.insets.left);
      expect(box!.x + box!.width).toBeLessThanOrEqual(scenario.width - scenario.insets.right + 1);
      expect(box!.y).toBeGreaterThanOrEqual(scenario.insets.top);
      expect(box!.y + box!.height).toBeLessThanOrEqual(scenario.height - scenario.insets.bottom + 1);
    };
    await page.getByText('variablen Kosten', { exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await assertSafeAction(page.getByRole('button', { name: 'Im Glossar öffnen', exact: true }));
    await page.getByRole('button', { name: 'Begriff schließen', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
    await page.getByRole('button', { name: 'Notiz', exact: true }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('textbox', { name: 'Notiztext', exact: true }).fill('Sicher oberhalb der Systemnavigation.');
    await assertSafeAction(page.getByRole('button', { name: 'Notiz speichern', exact: true }));
    await page.getByRole('button', { name: 'Schließen', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
    await page.getByRole('button', { name: 'Karte erstellen', exact: true }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await assertSafeAction(page.getByRole('button', { name: 'Im Lernfach speichern', exact: true }));
    await page.getByRole('button', { name: 'Schließen', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
    await page.getByRole('tab', { name: 'MeiWik', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await assertSafeAction(page.getByRole('button', { name: 'An MeiWik senden', exact: true }));
    await page.getByRole('button', { name: 'Chat verkleinern', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
  }
});

async function openChapter(page: Page, name: RegExp) {
  const entry = page.getByRole('button', { name });
  const list = page.getByTestId('chapter-list');
  for (let step = 0; step < 24 && !await entry.count(); step++) {
    await list.evaluate(element => element.scrollBy(0, element.clientHeight || 540));
    // The virtual list creates the next group of rows on subsequent frames.
    await list.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  }
  await entry.click({ timeout: 5000 });
}

test('the logistics catalogue opens an inventory diagram and keeps the case solution collapsed', async ({ page }) => {
  await isolateCloud(page);
  await page.goto('/');
  await page.getByRole('button', { name: /^Fächer/ }).click();
  await page.getByRole('button', { name: /^Logistik,/ }).click();
  await openChapter(page, /1\.3\.4 Bestellpunkt/);
  await expect(page.getByRole('heading', { name: 'Bestellpunkt, Meldebestand und Bestellrhythmus', exact: true })).toBeVisible();
  await expect(page.locator('svg[viewBox="0 0 320 177"] polyline')).toBeVisible();
  await expect(page.getByText(/Am Tag 0 wird beim Meldebestand/)).toBeVisible();

  await page.getByRole('button', { name: 'Zurück', exact: true }).click();
  await openChapter(page, /2\.4 Übungsfall: Bestellzeitpunkt/);
  await expect(page.getByText(/Ermittle den Meldebestand und den Arbeitstag/)).toBeVisible();
  const solution = page.getByRole('button', { name: /Musterlösung/ });
  await expect(solution).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText(/Ersparnis = 600/)).toBeHidden();
  await solution.click();
  await expect(page.getByText(/Ersparnis = 600.*17,24/)).toBeVisible();
});

test('ABC analysis shows the value chart, linked glossary and a path to XYZ', async ({ page }) => {
  await isolateCloud(page);
  await page.goto('/');
  await page.getByRole('button', { name: /^Fächer/ }).click();
  await page.getByRole('button', { name: /^Logistik,/ }).click();
  await openChapter(page, /1\.2\.5\.1 ABC-Analyse/);
  await expect(page.getByRole('heading', { name: 'ABC-Analyse', exact: true })).toBeVisible();
  const diagram = page.locator('svg[viewBox="0 0 320 211"]');
  await expect(diagram.locator('rect')).toHaveCount(3);
  await expect(diagram.locator('polyline')).toBeVisible();
  await page.getByRole('button', { name: 'Jahresverbrauchswert', exact: true }).click();
  await expect(page.getByRole('dialog').getByText('Jahresverbrauchswert', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Begriff schließen', exact: true }).click();
  await page.getByRole('button', { name: 'XYZ-Analyse und ABC-XYZ-Matrix', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'XYZ-Analyse und ABC-XYZ-Matrix', exact: true })).toBeVisible();
});

test('the marketing catalogue opens an offline article, its matrix and its glossary link', async ({ page }) => {
  await isolateCloud(page);
  await page.goto('/');
  await page.getByRole('button', { name: /^Fächer/ }).click();
  await page.getByRole('button', { name: /^Marketing und Vertrieb,/ }).click();
  await openChapter(page, /Ansoff-Matrix und Wachstumsstrategien/);
  await expect(page.getByTestId('page-header').getByRole('heading', { name: 'Ansoff-Matrix und Wachstumsstrategien' })).toBeVisible();
  await expect(page.getByText('Bestehender Markt', { exact: true })).toBeVisible();
  await expect(page.getByText('Neuer Markt', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ansoff-Matrix', exact: true }).click();
  await expect(page.getByRole('dialog').getByText('Ansoff-Matrix', { exact: true })).toBeVisible();
});

test('the leadership catalogue opens a teaching matrix from the offline bundle', async ({ page }) => {
  const lesson = fixtureArticles.find(article => article.id === 'fz-situative-fuehrung')!;
  const matrix = lesson.sections.find(section => section.matrix)?.matrix;
  expect(matrix).toBeDefined();
  await isolateCloud(page);
  await page.goto('/');
  await page.getByRole('button', { name: /^Fächer/ }).click();
  await page.getByRole('button', { name: /^Führung und Zusammenarbeit,/ }).click();
  await openChapter(page, new RegExp(lesson.number.replaceAll('.', '\\.') + ' '));
  await expect(page.getByTestId('page-header').getByRole('heading', { name: lesson.title, exact: true })).toBeVisible();
  await expect(page.getByText(matrix!.description, { exact: true })).toBeVisible();
});

test('the law catalogue opens an offline case and its collapsible answer', async ({ page }) => {
  await isolateCloud(page);
  await page.goto('/');
  await page.getByRole('button', { name: /^Fächer/ }).click();
  await page.getByRole('button', { name: /^Recht,/ }).click();
  await openChapter(page, /Übungsfall: Handelsvollmacht, Prokura und Widerruf/);
  await expect(page.getByTestId('page-header').getByRole('heading', {
    name: 'Übungsfall: Handelsvollmacht, Prokura und Widerruf', exact: true,
  })).toBeVisible();
  const result = page.getByText(/In B hatte die Vertreterin tatsächlich Prokura/);
  await expect(result).toHaveCount(0);
  await page.getByRole('button', { name: /Musterantwort/ }).click();
  await expect(result).toBeVisible();
});

test('the management catalogue opens its network planning lesson, glossary and practice answer offline', async ({ page }) => {
  await isolateCloud(page);
  await page.goto('/');
  await page.getByRole('button', { name: /^Fächer/ }).click();
  await page.getByRole('button', { name: /^Betriebliches Management,/ }).click();
  await openChapter(page, /Netzplan, kritischer Pfad und Pufferzeit/);
  await expect(page.getByTestId('page-header').getByRole('heading', {
    name: 'Netzplan, kritischer Pfad und Pufferzeit', exact: true,
  })).toBeVisible();
  await page.getByRole('button', { name: 'kritische Pfad', exact: true }).click();
  const glossary = page.getByRole('dialog');
  await expect(glossary.getByText('Kritischer Pfad', { exact: true })).toBeVisible();
  await glossary.getByRole('button', { name: 'Begriff schließen', exact: true }).click();
  const answer = page.getByText(/Der Pfad A → C → D wird kritisch/);
  await expect(answer).toHaveCount(0);
  await page.getByRole('button', { name: /Musterantwort/ }).last().click();
  await expect(answer).toBeVisible();
});

test('a large offline catalogue can be browsed through a bounded glossary and read from disk after reload', async ({ page }) => {
  await isolateCloud(page);
  await page.goto('/');
  const fixture = scaledCatalogue();
  const index = catalogueIndex(fixture);
  await page.evaluate(async ({ index, articles }) => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('mywik-downloaded-content-v2', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('catalogue');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('catalogue', 'readwrite');
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(tx.error);
      const store = tx.objectStore('catalogue');
      const source = `sim/${index.version}`;
      for (const article of articles) store.put(JSON.stringify(article), `@mywik/catalogue/article/v2/${source}/${article.id}`);
      const sources = Object.fromEntries(articles.map(article => [article.id, source]));
      store.put(JSON.stringify({ schema: 2, legacyVersion: 0, packVersions: {}, index, sources }), '@mywik/catalogue/index/v2');
    });
    db.close();
  }, { index, articles: fixture.articles });
  await page.reload();
  await expect(page.getByRole('button',{name:new RegExp('Begriffsglossar.*'+index.glossary.length)})).toBeVisible();
  await page.getByRole('tab', { name: 'Suche', exact: true }).click();
  const list = page.getByTestId('glossary-list');
  const search = page.getByRole('textbox',{name:'Glossar durchsuchen',exact:true});
  await expect(list.getByRole('button').first()).toBeVisible();
  expect(await list.getByRole('button').count()).toBeLessThan(100);
  const simulatedTerm = `Leittextmethode Simulation ${catalogueCopies - 1}`;
  await search.fill(simulatedTerm);
  await page.getByRole('button',{name:simulatedTerm,exact:true}).click();
  await page.getByRole('button',{name:'Zum Artikel',exact:true}).click();
  await expect(page.getByRole('heading',{name:`Die ${simulatedTerm}`,exact:true})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Prinzip und Ziel',exact:true})).toBeVisible();
});

test('a long article opens at its saved section before presenting the reading view', async ({ page }) => {
  await isolateCloud(page);
  await page.addInitScript(() => {
    localStorage.setItem('mywik:reading:guest:logistik-abc-analyse', JSON.stringify({ version: 2, y: 0, anchorId: 'transferfrage', anchorOffset: 0 }));
  });
  await page.goto('/');
  await page.getByRole('button',{name:/^Fächer/}).click();
  await page.getByRole('button',{name:/^Logistik,/}).click();
  await openChapter(page,/1\.2\.5\.1 ABC-Analyse/);
  await expect(page.getByRole('heading',{name:'Transferfrage',exact:true})).toBeInViewport();
  await expect(page.getByTestId('page-header').getByRole('heading',{name:'ABC-Analyse',exact:true})).toBeInViewport();
});

test('settings check for updates and open the published APK download', async ({ page }) => {
  await isolateCloud(page);
  await page.addInitScript(() => {
    window.open = url => { (window as Window & { updateDownload?: string }).updateDownload = String(url); return null; };
  });
  let nextVersion = appConfig.version;
  let reachable = true;
  const download = () => `${androidReleasesUrl}/download/v${nextVersion}-preview/myWik-${nextVersion}-Samsung.apk`;
  await page.route(androidReleasesApi, route => {
    if (!reachable) return route.fulfill({ status: 503 });
    return route.fulfill({ json: [{
      tag_name: `v${nextVersion}-preview`, draft: false, published_at: '2026-11-18T13:00:00Z',
      assets: [{ name: `myWik-${nextVersion}-Samsung.apk`, state: 'uploaded', size: 36_000_000, browser_download_url: download() }],
    }] });
  });
  await page.goto('/');
  await openSettings(page);
  const check = page.getByRole('button', { name: 'Nach Updates schauen', exact: true });
  await expect(page.getByText(`Installierte Version ${appConfig.version}`, { exact: true })).toBeVisible();
  await check.click();
  await expect(page.getByText('Deine App ist auf dem neuesten Stand.')).toBeVisible();

  const [major, minor, patch] = appConfig.version.split('.').map(Number);
  nextVersion = `${major}.${minor}.${patch + 1}`;
  await check.click();
  await expect(page.getByText(`Version ${nextVersion} ist verfügbar.`)).toBeVisible();
  const apk = page.getByRole('button', { name: 'APK herunterladen', exact: true });
  await apk.click();
  await expect.poll(() => page.evaluate(() => (window as Window & { updateDownload?: string }).updateDownload)).toBe(download());

  reachable = false;
  await check.click();
  await expect(page.getByRole('alert').filter({ hasText: 'Die Suche nach Updates ist gerade nicht möglich.' })).toBeVisible();
  await expect(apk).toHaveCount(0);
});
