import assert from 'node:assert/strict';
import test from 'node:test';
import { androidReleasesUrl, selectAndroidUpdate } from '../src/services/androidUpdates';

function release(version: string) {
  const tag = `v${version}-preview`;
  const name = `myWik-${version}-Samsung.apk`;
  return {
    draft: false,
    published_at: '2026-11-18T13:00:00Z',
    tag_name: tag,
    assets: [{ name, size: 36_000_000, state: 'uploaded', browser_download_url: `${androidReleasesUrl}/download/${tag}/${name}` }],
  };
}

test('selects the newest downloadable preview by version and never offers a downgrade', () => {
  const versions = [release('0.9.0'), release('0.10.0'), release('0.8.1')];
  assert.deepEqual(selectAndroidUpdate(versions, '0.8.0'), {
    version: '0.10.0', downloadUrl: versions[1].assets[0].browser_download_url,
  });
  assert.equal(selectAndroidUpdate(versions, '0.10.0'), null);
  assert.equal(selectAndroidUpdate(versions, '1.0.0'), null);
});

test('skips drafts, missing files, wrong channels and downloads from other URLs', () => {
  const differentUrl = release('0.16.0');
  differentUrl.assets[0].browser_download_url = 'https://github.com/another/project/releases/download/latest/update.apk';
  const releases = [
    { ...release('0.15.0'), draft: true },
    { ...release('0.14.0'), assets: [] },
    { ...release('0.13.0'), tag_name: 'v0.13.0' },
    { ...release('0.12.0'), published_at: null },
    differentUrl,
    release('0.8.0'),
  ];
  assert.equal(selectAndroidUpdate(releases, '0.8.0'), null);
  assert.throws(() => selectAndroidUpdate(releases.slice(0, -1), '0.8.0'));
  assert.throws(() => selectAndroidUpdate(releases, 'unbekannt'));
});
