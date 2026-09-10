import { useEffect } from "react";

const WHEEL_THRESHOLD = 100;
const SNAP_DURATION = 300;
const SNAP_SELECTOR = "[data-scroll-snap], [data-scroll-track]";
const SCROLL_TRACK_SELECTOR = "[data-scroll-track]";

export function useSectionScrollSnap({ enabled }) {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    let wheelDistance = 0;
    let isSnapping = false;
    let resetTimer;
    let snapTimer;

    const getSnapTargets = () => (
      Array.from(document.querySelectorAll(SNAP_SELECTOR))
        .map((element) => ({
          element,
          top: element.getBoundingClientRect().top + window.scrollY,
        }))
        .sort((first, second) => first.top - second.top)
    );

    const getCurrentIndex = (targets) => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentIndex = 0;

      targets.forEach((target, index) => {
        if (target.top <= scrollPosition) {
          currentIndex = index;
        }
      });

      const currentTarget = targets[currentIndex];
      const previousTarget = targets[currentIndex - 1];
      if (currentTarget?.element.id === "section-5"
        && previousTarget?.element.hasAttribute("data-scroll-track")
        && window.scrollY < currentTarget.top) {
        return currentIndex - 1;
      }

      return currentIndex;
    };

    const getScrollTrackBounds = () => {
      const track = document.querySelector(SCROLL_TRACK_SELECTOR);
      if (!track) {
        return undefined;
      }

      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const trackBottom = trackTop + track.offsetHeight;
      return { trackTop, trackBottom };
    };

    const snapToSection = (direction) => {
      const targets = getSnapTargets();
      if (targets.length < 2) {
        return;
      }

      const currentIndex = getCurrentIndex(targets);
      const nextIndex = Math.max(
        0,
        Math.min(targets.length - 1, currentIndex + direction),
      );

      if (nextIndex === currentIndex) {
        return;
      }

      isSnapping = true;
      window.scrollTo({
        top: targets[nextIndex].top,
        behavior: "smooth",
      });

      clearTimeout(snapTimer);
      snapTimer = window.setTimeout(() => {
        isSnapping = false;
      }, SNAP_DURATION);
    };

    const handleWheel = (event) => {
      if (event.deltaY === 0) {
        return;
      }

      if (isSnapping) {
        event.preventDefault();
        wheelDistance = 0; // Reset accumulation when snapping
        return;
      }

      const targets = getSnapTargets();
      const currentIndex = getCurrentIndex(targets);
      const currentTarget = targets[currentIndex];
      const nextTarget = targets[currentIndex + 1];
      const previousTarget = targets[currentIndex - 1];
      const trackBounds = getScrollTrackBounds();
      const isInsideScrollTrack = trackBounds
        && window.scrollY >= trackBounds.trackTop
        && window.scrollY < trackBounds.trackBottom;
      const crossesTrackBottom = isInsideScrollTrack
        && event.deltaY > 0
        && window.scrollY + event.deltaY >= trackBounds.trackBottom;
      const crossesTrackTop = isInsideScrollTrack
        && event.deltaY < 0
        && window.scrollY + event.deltaY <= trackBounds.trackTop;

      if (isInsideScrollTrack && !crossesTrackBottom && !crossesTrackTop) {
        wheelDistance = 0;
        return;
      }

      if (crossesTrackBottom || crossesTrackTop) {
        event.preventDefault();
        wheelDistance = 0;
        snapToSection(event.deltaY > 0 ? 1 : -1);
        return;
      }

      event.preventDefault();

      wheelDistance += event.deltaY;
      clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        wheelDistance = 0;
      }, 180);

      if (Math.abs(wheelDistance) < WHEEL_THRESHOLD) {
        return;
      }

      const direction = wheelDistance > 0 ? 1 : -1;
      wheelDistance = 0;
      snapToSection(direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(resetTimer);
      clearTimeout(snapTimer);
    };
  }, [enabled]);
}
