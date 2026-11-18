const repository = 'CornerDesign-Dominic/myWik';
export const androidReleasesUrl = `https://github.com/${repository}/releases`;
export const androidReleasesApi = `https://api.github.com/repos/${repository}/releases?per_page=50`;

export interface AndroidUpdate {
  version: string;
  downloadUrl: string;
}

function readVersion(version: string) {
  const match = /^(0|[1-9]\d{0,5})\.(0|[1-9]\d{0,5})\.(0|[1-9]\d{0,5})$/.exec(version);
  return match?.slice(1).map(Number);
}

function compareVersions(left: number[], right: number[]) {
  return left[0] - right[0] || left[1] - right[1] || left[2] - right[2];
}

function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/** This channel ships APKs signed for de.mywik.app.preview. */
export function selectAndroidUpdate(releases: unknown, installedVersion: string): AndroidUpdate | null {
  const installed = readVersion(installedVersion);
  if (!installed || !Array.isArray(releases)) throw new Error('Ungültige Versionsinformationen.');

  let latest: AndroidUpdate | undefined;
  let latestVersion: number[] | undefined;
  for (const release of releases) {
    if (!record(release) || release.draft !== false || typeof release.published_at !== 'string'
      || typeof release.tag_name !== 'string' || !Array.isArray(release.assets)) continue;
    const tag = release.tag_name;
    const version = /^v([0-9.]+)-preview$/.exec(tag)?.[1];
    const parsed = version && readVersion(version);
    if (!version || !parsed || (latestVersion && compareVersions(parsed, latestVersion) <= 0)) continue;

    const apk = `myWik-${version}-Samsung.apk`;
    const downloadUrl = `${androidReleasesUrl}/download/${tag}/${apk}`;
    if (!release.assets.some(asset => record(asset) && asset.name === apk && asset.state === 'uploaded'
      && typeof asset.size === 'number' && asset.size > 0 && asset.browser_download_url === downloadUrl)) continue;

    latest = { version, downloadUrl };
    latestVersion = parsed;
  }
  if (!latest || !latestVersion) throw new Error('Kein veröffentlichtes Android-Paket gefunden.');
  return compareVersions(latestVersion, installed) > 0 ? latest : null;
}

export async function checkAndroidUpdate(installedVersion: string, signal: AbortSignal) {
  const response = await fetch(androidReleasesApi, { signal, headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) throw new Error('Die Android-Updates sind gerade nicht erreichbar.');
  return selectAndroidUpdate(await response.json(), installedVersion);
}
