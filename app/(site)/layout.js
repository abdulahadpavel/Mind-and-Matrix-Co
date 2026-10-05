import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function SiteLayout({ children }) {
  return (
    <>
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
