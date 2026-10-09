import { createElement, useEffect } from "react";
import SEO from "@/components/SEO";

export default function GettingClients() {
  useEffect(() => {
    if (customElements.get("ren-contractors")) return;
    if (document.querySelector("script[data-ren-contractors]")) return;
    const script = document.createElement("script");
    script.src = "/ren-contractors.js";
    script.async = true;
    script.dataset.renContractors = "";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="pt-20">
      <SEO
        title="Getting new clients"
        description="A text for missed calls, with a quote-form link and a notification for you. Plans for renovation contractors who can’t always pick up."
        path="/services"
        keywords="contractor enquiry follow-up, missed call text back, quote request follow-up, Ren Strategies"
      />
      {createElement("ren-contractors", { cta: "sms:+17789867616", pace: "1" })}
    </div>
  );
}
