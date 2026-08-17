// Uploaded portfolio assets live at public/work/uploads with their original,
// human-readable filenames (spaces and all) — decoded once here so callers can
// keep passing the same "uploads/Foo Bar.png" strings the source HTML used.
export function workAsset(path) {
  const decoded = decodeURIComponent(path);
  return '/work/' + decoded.split('/').map(encodeURIComponent).join('/');
}
