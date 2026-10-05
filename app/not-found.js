import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroBackdrop from "@/components/HeroBackdrop";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero page-hero">
          <HeroBackdrop />
          <div className="wrap">
            <span className="hero-badge">
              <i /> 404
            </span>
            <h1>Page not found</h1>
            <p className="hero-lead">The page you are looking for doesn’t exist or has moved.</p>
            <Link className="btn btn-light" href="/">
              Go to the home page
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
