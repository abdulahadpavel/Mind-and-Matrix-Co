import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import { GoogleTagManagerNoScript, GoogleTagManagerScript } from "@/components/GoogleTagManager";

export default function SiteLayout({ children }) {
  return (
    <>
      <GoogleTagManagerNoScript />
      <GoogleTagManagerScript />
      <a className="skip-link screen-reader-text" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsAppButton />
      <RevealOnScroll />
    </>
  );
}
