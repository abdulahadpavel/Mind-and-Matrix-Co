import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import HeroBackdrop from "@/components/HeroBackdrop";
import CaseStudyCard from "@/components/CaseStudyCard";
import Markdown from "@/components/Markdown";
import { getPublishedBySlug, safeListPublished } from "@/lib/caseStudies";

// Published case studies are built ahead of time; new ones are built on first visit.
// Saving in the admin clears these pages so changes show right away.
export async function generateStaticParams() {
  const list = await safeListPublished();
  return list.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = await getPublishedBySlug(slug);
  if (!cs) return { title: "Case study not found" };
  const title = cs.seo_title || cs.title;
  const description = cs.seo_description || cs.summary;
  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/case-studies/${cs.slug}`,
      ...(cs.cover_url ? { images: [{ url: cs.cover_url, alt: cs.cover_alt || cs.title }] } : {}),
    },
    twitter: { card: cs.cover_url ? "summary_large_image" : "summary", title, description },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = await getPublishedBySlug(slug);
  if (!cs) notFound();

  const more = await safeListPublished({ limit: 3, excludeSlug: cs.slug });
  const metrics = cs.metrics || [];
  const formId = "case-form";

  return (
    <main id="main">
      <section className="hero page-hero cs-hero">
        <HeroBackdrop />
        <div className="wrap hero-grid">
          <div>
            <nav className="cs-crumbs" aria-label="Breadcrumb">
              <Link href="/case-studies">Case studies</Link>
              <span aria-hidden="true">/</span>
              <span>{cs.client || cs.industry || "Case study"}</span>
            </nav>
            <h1 className="cs-title">{cs.title}</h1>
            {cs.summary && <p className="hero-lead">{cs.summary}</p>}
            {metrics.length > 0 && (
              <dl className="cs-hero-metrics">
                {metrics.map((m, i) => (
                  <div key={i}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {cs.tags?.length > 0 && (
              <ul className="cs-tags" aria-label="Services">
                {cs.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </div>
          <LeadForm
            id={formId}
            title="Want results like this for your clients?"
            subtitle="Tell us about your agency. We reply within 1 business day."
            source={`case-study:${cs.slug}`.slice(0, 60)}
            submitLabel="Get my free proposal"
          />
        </div>
      </section>

      <section className="section cs-body-section">
        <div className="wrap cs-layout">
          <article className="cs-article">
            {cs.cover_url && (
              <figure className="cs-cover">
                <img src={cs.cover_url} alt={cs.cover_alt || ""} fetchPriority="high" />
              </figure>
            )}
            <Markdown source={cs.body} className="md cs-md" />
          </article>

          <aside className="cs-aside">
            <div className="cs-aside-card">
              <dl className="cs-facts">
                {cs.client && (
                  <div>
                    <dt>Client</dt>
                    <dd>{cs.client}</dd>
                  </div>
                )}
                {cs.industry && (
                  <div>
                    <dt>Industry</dt>
                    <dd>{cs.industry}</dd>
                  </div>
                )}
                {cs.tags?.length > 0 && (
                  <div>
                    <dt>Services</dt>
                    <dd>{cs.tags.join(", ")}</dd>
                  </div>
                )}
              </dl>
              {metrics.length > 0 && (
                <dl className="cs-aside-metrics">
                  {metrics.map((m, i) => (
                    <div key={i}>
                      <dt>{m.label}</dt>
                      <dd>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <a className="btn btn-primary btn-block" href={`#${formId}`}>
                Get a free proposal
              </a>
              <p className="cs-aside-note">White label. NDA on request. Reply within 1 business day.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section cs-cta-section">
        <div className="wrap">
          <div className="cta-band reveal">
            <div>
              <h2>Want a campaign like this for your client?</h2>
              <p>Send us one client account. We’ll send back a free, white-labeled audit you can present as your own.</p>
            </div>
            <a className="btn btn-light" href={`#${formId}`}>
              Get my free audit
            </a>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section section-soft">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">More results</span>
              <h2>More case studies</h2>
            </div>
            <div className="grid g3 cs-grid">
              {more.map((c) => (
                <CaseStudyCard key={c.id} cs={c} headingLevel={3} />
              ))}
            </div>
            <p className="cs-all-link">
              <Link className="btn btn-outline" href="/case-studies">
                View all case studies
              </Link>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
