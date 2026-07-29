/**
 * A fixed film of noise over the whole site. The palette is four flat, very
 * quiet colours — without a texture the large ivory fields read as an empty
 * browser window rather than paper.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export default function Grain() {
  return <div className="grain" aria-hidden="true" style={{ '--grain-src': NOISE }} />;
}
