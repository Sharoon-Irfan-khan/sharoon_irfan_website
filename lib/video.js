/**
 * Start a muted background loop, and mean it.
 *
 * `video.play()` returns a promise that rejects if it is called before the
 * element has any data — which is exactly what happens when an
 * IntersectionObserver fires on a clip whose first bytes have not arrived.
 * Swallowing that rejection, as `play().catch(() => {})` does, leaves the
 * video parked on its poster with nothing scheduled to try again.
 *
 * So: attempt now, and if the element is not ready, attempt again the moment
 * it is. `loadeddata` is the right event — `canplay` can be late on slow
 * connections, and readyState 2 is enough to start a muted loop.
 *
 * Every caller also sets `autoPlay` on the element. The two are belt and
 * braces: autoPlay covers the ordinary case where the browser starts playback
 * itself, and this covers the case where playback was paused off-screen and
 * has to be resumed.
 */
export function playSafe(el) {
  if (!el) return;

  const attempt = () => {
    const p = el.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  attempt();

  // readyState < HAVE_CURRENT_DATA means the attempt above almost certainly
  // rejected. Queue one retry rather than leaving it on the poster.
  if (el.readyState < 2) {
    el.addEventListener('loadeddata', attempt, { once: true });
  }
}
