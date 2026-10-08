import { createElement, useEffect } from "react";

export default function ServicesAnimation() {
  useEffect(() => {
    if (customElements.get("ren-services")) return;
    if (document.querySelector("script[data-ren-services]")) return;
    const script = document.createElement("script");
    script.src = "/ren-services.js";
    script.async = true;
    script.dataset.renServices = "";
    document.body.appendChild(script);
  }, []);

  return createElement("ren-services", { cta: "/contact", pace: "1" });
}
