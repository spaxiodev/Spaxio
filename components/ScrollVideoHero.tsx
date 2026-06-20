"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  src: string;
  poster: string;
  /** Height of the scroll track in viewport heights. More = slower, finer scrub. */
  trackVh?: number;
  children?: ReactNode;
};

/**
 * Full-screen video that scrubs frame-by-frame as the user scrolls through a tall
 * track. The video is encoded all-intra (every frame a keyframe) so seeking is
 * instant; a per-frame lerp toward the target time gives a smooth "flick" inertia
 * feel. When the track is fully scrolled the final frame stays on screen, and the
 * blurred final-frame background (rendered behind the page) takes over.
 */
export default function ScrollVideoHero({ src, poster, trackVh = 320, children }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!track || !video) return;

    let duration = 0;
    let ready = false;
    let target = 0;
    let current = 0;
    let raf = 0;
    let lastSeek = -1;

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      ready = duration > 0;
    };

    const computeTarget = () => {
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      target = progress * duration;
      if (overlay) {
        // Fade the hero copy out across the first third of the scrub.
        const fade = Math.max(0, 1 - progress / 0.28);
        overlay.style.opacity = fade.toFixed(3);
        overlay.style.transform = `translate3d(0, ${(-progress * 40).toFixed(1)}px, 0)`;
      }
    };

    const loop = () => {
      if (ready) {
        // Ease toward the target time -> inertia so quick flicks glide instead of snapping.
        current += (target - current) * 0.16;
        if (Math.abs(target - current) < 0.0015) current = target;
        if (Math.abs(current - lastSeek) > 0.001) {
          try {
            video.currentTime = current;
            lastSeek = current;
          } catch {
            /* seeking before ready – ignored, retried next frame */
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };

    // Prime decode on iOS/Safari: a muted play/pause unlocks frame-accurate seeking.
    const prime = () => {
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {});
      }
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("pointerdown", prime);
    };

    if (video.readyState >= 1) onMeta();
    video.addEventListener("loadedmetadata", onMeta);
    window.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", computeTarget);
    window.addEventListener("touchstart", prime, { passive: true });
    window.addEventListener("pointerdown", prime, { passive: true });

    computeTarget();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", computeTarget);
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("pointerdown", prime);
    };
  }, []);

  return (
    <div ref={trackRef} className="cs-track" style={{ height: `${trackVh}vh` }}>
      <div className="cs-sticky">
        <video
          ref={videoRef}
          className="cs-video"
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />
        <div className="cs-video-veil" aria-hidden="true" />
        <div ref={overlayRef} className="cs-hero-copy">
          {children}
        </div>
        <div className="cs-scroll-cue" aria-hidden="true">
          <span>Scroll to build</span>
          <i />
        </div>
      </div>
    </div>
  );
}
