import { useEffect } from "react"
import { Capacitor } from "@capacitor/core"

export const useCapacitorSafeArea = () => {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return  // guards the web

    /* 1-A  Inject CSS rule exactly once */
    const css = `
      .__safe-header {
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
        transition: transform .3s ease;
        position: sticky;
        top: 0;
        z-index: 50;
      }
    `
    const styleTag = document.createElement("style")
    styleTag.innerHTML = css
    document.head.appendChild(styleTag)

    /* 1-B  Hide on scroll-down / show on scroll-up */
    let lastY = 0
    window.addEventListener(
      "scroll",
      () => {
        const dir = window.scrollY > lastY ? "down" : "up"
        lastY = window.scrollY
        const hdr = document.querySelector("header.__safe-header") as HTMLElement
        if (hdr) hdr.style.transform = dir === "down" ? "translateY(-100%)" : "translateY(0)"
      },
      { passive: true }
    )
  }, [])
}
