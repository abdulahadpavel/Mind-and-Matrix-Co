// Content for the white-label landing pages (one page per white-label keyword group).
// Each page renders through components/ServicePage.js at /<slug>, with "White Label" in the breadcrumb.
// `article` is the long-form section: [heading, [paragraphs]]. Paragraphs may hold [text](/path) links.

export const WHITE_LABEL_PAGES = [
  {
    slug: "white-label-ppc",
    navLabel: "White Label PPC",
    metaTitle: "White Label PPC Agency — PPC Management for Agencies",
    metaDescription:
      "White label PPC management for marketing agencies. We run Google, Meta, Microsoft and LinkedIn ads for your clients under your brand — NDA signed, wholesale pricing, month to month.",
    keywords: [
      "white label PPC agency",
      "white label PPC services",
      "white label PPC management",
      "outsource PPC for agencies",
      "PPC fulfillment partner",
      "white label paid media",
    ],
    serviceType: "White label PPC management",
    eyebrow: "White label PPC",
    h1: ["The white label PPC team ", "behind your agency."],
    lead:
      "We plan, launch and manage your clients’ Google Ads, Meta, Microsoft and LinkedIn campaigns — fully under your agency’s brand. You keep the client, set the price and keep the margin. We do the work and stay invisible.",
    checks: [
      "Google, Meta, Microsoft, LinkedIn & TikTok ads",
      "Branded reports with your logo, never ours",
      "NDA, wholesale pricing, no long-term contract",
    ],
    formTitle: "Get a free white-label PPC audit",
    whyTitle: "Why agencies outsource PPC to us",
    whyIntro:
      "Hiring a senior PPC specialist takes months and costs a full salary before the first client pays for it. A white label PPC partner gives you a trained team from day one, and you only pay for the accounts you have.",
    why: [
      ["Senior people on every account", "Your client accounts are run by specialists with years in Google, Meta and Microsoft ads — not juniors learning on your budget."],
      ["100% under your brand", "Reports, audits and proposals carry your logo. We work from your agency email when needed and join calls as your team."],
      ["Tracking first", "We fix conversion tracking before we scale spend: GA4, Tag Manager, enhanced conversions, Conversions API and offline imports."],
      ["Built around leads and revenue", "We report on leads, booked calls, sales and ROAS, so your clients see business results, not clicks and impressions."],
      ["Flexible capacity", "Add one client or twenty. Scale up when you win accounts and scale down when you don’t, month to month."],
      ["Your client, your margin", "You set the retail price. We never contact your clients directly and sign a non-solicitation agreement."],
    ],
    includedTitle: "White label PPC services included",
    included: [
      "Account audits for prospects and new clients",
      "Campaign strategy, budget split and forecasts",
      "Google Ads, Meta, Microsoft Ads, LinkedIn and TikTok campaigns",
      "Ad copy, creatives and ongoing A/B testing",
      "Landing page recommendations or full builds",
      "Conversion tracking and server-side tracking",
      "Weekly optimization and bid management",
      "Monthly white-label reports and live dashboards",
    ],
    steps: [
      ["Partner call & NDA", "We learn how your agency works and sign an NDA before we see any account."],
      ["Free branded audit", "Send one client account. We return an audit with your logo, ready to present as your own."],
      ["Launch & manage", "We build, launch and optimize the campaigns, and send you weekly updates and monthly branded reports."],
    ],
    article: [
      [
        "What is white label PPC?",
        [
          "White label PPC is when an agency resells pay-per-click advertising that another team actually runs. Your agency sells the service, owns the client relationship and sets the price. The white label partner — that’s us — builds and manages the campaigns behind the scenes, under your name.",
          "Your client sees one agency: yours. Reports carry your logo, calls happen with your team, and every change in the ad account is made through access your agency controls. It is how SEO, web design and full-service agencies add paid media without hiring a PPC department.",
        ],
      ],
      [
        "How our white label PPC partnership works",
        [
          "It starts with a partner call and an NDA. We learn which clients you serve, how you price, and how you like to communicate — Slack, email or WhatsApp. Then you send us one client account, and we return a free audit with your branding that you can present to the client as your own work.",
          "Once the client signs, we join their ad accounts through partner or manager access under your agency. We fix tracking, build or restructure campaigns, and manage them every week. You get a weekly update and a monthly branded report per client, and we can join client calls as members of your team.",
        ],
      ],
      [
        "Which PPC channels we manage",
        [
          "Most agencies start with Google Ads and Meta, because that is where most small and mid-size businesses spend. We also run Microsoft Ads (Bing), LinkedIn Ads for B2B clients, TikTok Ads, YouTube and Google Shopping. Each channel has its own white label page with more detail: [Google Ads](/white-label-google-ads), [Facebook and Instagram ads](/white-label-facebook-ads), [Microsoft Ads](/white-label-microsoft-ads) and [LinkedIn Ads](/white-label-linkedin-ads).",
          "Every campaign we run sits on top of proper conversion tracking. Our founders come from AdTech and tracking backgrounds, so [server-side tracking, Meta Conversions API and offline conversion imports](/white-label-tracking) are part of the service — not an upsell.",
        ],
      ],
      [
        "White label PPC pricing",
        [
          "We work on two models. Per client account: a wholesale fee for each account we manage, best when you add paid media one client at a time. Dedicated team: a monthly fee for a team working across your whole client roster, best when you have several active accounts.",
          "There are no long-term contracts. You set your own retail price and keep the difference. Our wholesale rates are shared on the partner call, once we understand your clients and budgets.",
        ],
      ],
      [
        "Who white label PPC is for",
        [
          "SEO and web design agencies whose clients keep asking for ads. Full-service agencies that want to grow paid media without the cost and risk of hiring. Agencies at capacity that need overflow help when they win more accounts than their team can handle. And niche agencies in [dental](/white-label-dental-ppc), healthcare, home services, real estate and e-commerce, industries we already know well.",
        ],
      ],
    ],
    faqs: [
      ["What does a white label PPC agency do?", "A white label PPC agency runs pay-per-click campaigns for another agency’s clients, under that agency’s brand. The reselling agency owns the client relationship and sets the price; the white label team does the strategy, setup, management and reporting."],
      ["Will my clients know you are involved?", "No. Reports, audits and dashboards carry your branding, we sign an NDA, and we only talk to your clients if you invite us — as members of your team."],
      ["How much does white label PPC cost?", "We charge a wholesale fee per client account, or a monthly fee for a dedicated team. There are no long-term contracts. We share exact rates on the partner call once we know your clients’ budgets."],
      ["Who owns the ad accounts?", "Your client, or your agency, always owns the ad accounts, pixels and data. We get partner or manager access only, and you can remove it at any time."],
      ["What time zones do you work in?", "Our team is based in Dhaka, Bangladesh (GMT+6) and works with agencies in the US, Canada, the UK and Australia. We agree set overlap hours for calls and updates with every partner."],
      ["How fast can you start?", "Usually within a week of the partner call: NDA, a free branded audit of one client account, then onboarding as soon as your client signs."],
    ],
  },
  {
    slug: "white-label-google-ads",
    navLabel: "White Label Google Ads",
    metaTitle: "White Label Google Ads Management for Agencies",
    metaDescription:
      "White label Google Ads management: Search, Performance Max, Shopping, YouTube and Local Services Ads run under your agency’s brand. Free branded audit, NDA, wholesale pricing.",
    keywords: [
      "white label Google Ads",
      "white label Google Ads management",
      "white label Google Ads agency",
      "Google Ads white label services",
      "resell Google Ads",
    ],
    serviceType: "White label Google Ads management",
    eyebrow: "White label Google Ads",
    h1: ["White label Google Ads management, ", "under your brand."],
    lead:
      "We run your clients’ Google Ads — Search, Performance Max, Shopping, YouTube and Local Services Ads — from your agency’s manager account. Your clients see your agency. We do the keyword research, builds, testing and weekly optimization.",
    checks: [
      "Search, Performance Max, Shopping, YouTube & LSA",
      "Managed from your agency’s MCC",
      "Enhanced conversions and offline imports set up",
    ],
    formTitle: "Get a free branded Google Ads audit",
    whyTitle: "Google Ads your clients will renew",
    whyIntro:
      "Most Google Ads accounts lose budget to broad keywords, weak landing pages and broken tracking. We fix those foundations first, then scale what converts — so your clients stay because the numbers are good.",
    why: [
      ["Works inside your MCC", "Client accounts stay linked to your agency’s manager account. We get user access there, so you keep control and visibility."],
      ["Intent-led keyword strategy", "We group searches by intent, build tight ad groups and keep negative keyword lists clean so budget goes to buyers."],
      ["Performance Max done properly", "Asset groups, audience signals, feed work and brand exclusions, so Performance Max spends on new customers, not on your client’s own brand searches."],
      ["Real conversion data", "Enhanced conversions, call tracking and offline conversion imports, so Smart Bidding learns from booked leads and sales."],
      ["Local Services Ads", "For home service, legal and healthcare clients, we set up and manage Google Local Services Ads alongside Search."],
      ["Branded reporting", "Looker Studio or AgencyAnalytics dashboards with your logo, plus a monthly summary you can send as your own."],
    ],
    includedTitle: "What’s included in white label Google Ads",
    included: [
      "Account audit and competitor research",
      "Keyword research and negative keyword lists",
      "Search, Performance Max, Shopping, Display and YouTube campaigns",
      "Local Services Ads setup and management",
      "Responsive search ads, assets and creative testing",
      "GA4, Tag Manager, enhanced conversions and offline imports",
      "Merchant Center and product feed optimization",
      "Weekly optimization and monthly branded reports",
    ],
    steps: [
      ["Branded audit", "We audit one client account and give you a report with your logo to present or use in a pitch."],
      ["Tracking & rebuild", "We fix conversion tracking, then restructure campaigns around the highest-value searches."],
      ["Optimize & report", "Weekly bid, keyword and ad optimization, weekly updates to you and a monthly branded report."],
    ],
    article: [
      [
        "How white label Google Ads management works",
        [
          "Your agency keeps every client account linked to its Google Ads manager account (MCC). We get user access to your MCC, so all work happens inside an account your agency owns and controls. Your client never sees our name in the change history if you give us user logins under your agency domain.",
          "We handle the full account: keyword research, campaign structure, ad copy and assets, bidding, budgets, Merchant Center feeds, and the conversion tracking that makes Smart Bidding work. You get a short weekly update and a monthly branded report for each client.",
        ],
      ],
      [
        "Search, Performance Max and beyond",
        [
          "Search campaigns are still the fastest way to win high-intent leads, so most accounts start there. We split campaigns by service, location and intent, so every ad matches the search and Quality Score stays high. Performance Max and Shopping come in for e-commerce clients and for lead-gen accounts with enough conversion data to support them.",
          "For local service businesses — dentists, HVAC, plumbers, lawyers, movers — we also run Local Services Ads, which appear above regular search ads and charge per lead. Together they cover the whole results page for your client.",
        ],
      ],
      [
        "Tracking that makes bidding work",
        [
          "Google’s bidding is only as smart as the conversions it is given. We set up GA4 and Google Tag Manager, enhanced conversions, call tracking and, where your client has a CRM, offline conversion imports — so Google optimizes for booked appointments and closed sales instead of form fills that never answer the phone.",
          "If your client’s tracking is broken today, that is often the single biggest win we deliver in the first month. Read more on our [white label tracking page](/white-label-tracking).",
        ],
      ],
      [
        "Reselling Google Ads at a profit",
        [
          "You pay a wholesale fee per client account and set your own retail price. Many agencies charge clients a flat monthly management fee or a percentage of ad spend, and keep the difference. We share wholesale rates on the partner call, and there is no long-term contract — add or remove accounts month to month.",
        ],
      ],
    ],
    faqs: [
      ["Do you work from our Google Ads manager account?", "Yes. Client accounts stay linked to your MCC. We get user access there, and you can remove it at any time."],
      ["Can you manage Performance Max and Shopping?", "Yes. We set up and manage Performance Max, Shopping and Merchant Center feeds, including brand exclusions and audience signals."],
      ["Do you run Google Local Services Ads?", "Yes, for eligible industries such as home services, legal and healthcare. We set them up and manage them alongside Search."],
      ["What is the minimum ad spend per client?", "We don’t set a hard minimum, but Google Ads works best from about $1,000 a month in ad spend for local businesses. We’ll advise per client after the audit."],
      ["Will the reports show your name?", "No. Reports and dashboards carry your agency’s logo and colors only."],
    ],
  },
  {
    slug: "white-label-facebook-ads",
    navLabel: "White Label Facebook Ads",
    metaTitle: "White Label Facebook Ads Agency — Meta Ads for Agencies",
    metaDescription:
      "White label Facebook and Instagram ads for agencies. Meta campaigns, creatives, UGC and Conversions API managed under your brand. NDA, wholesale pricing, free branded audit.",
    keywords: [
      "white label Facebook ads",
      "white label Facebook ads agency",
      "white label Meta ads",
      "white label Meta ads management",
      "white label Instagram ads",
    ],
    serviceType: "White label Facebook and Instagram ads management",
    eyebrow: "White label Meta ads",
    h1: ["White label Facebook & Instagram ads ", "for agencies."],
    lead:
      "We run your clients’ Meta ads — Facebook, Instagram, Messenger and Reels — from your agency’s Business Manager. Strategy, creatives, Conversions API and weekly optimization, all delivered under your brand.",
    checks: [
      "Lead gen, e-commerce and app campaigns",
      "Static, video and UGC-style creatives",
      "Conversions API set up on every account",
    ],
    formTitle: "Get a free branded Meta ads audit",
    whyTitle: "Meta ads that hold up after iOS changes",
    whyIntro:
      "Meta ads still deliver some of the cheapest leads and sales online — when tracking is solid and creatives are tested constantly. Those two things are where most agency accounts fall short, and where we focus.",
    why: [
      ["Conversions API on every account", "Server-side events alongside the Pixel, with event matching and deduplication, so Meta sees the conversions browsers block."],
      ["Creative testing built in", "New statics, videos and UGC-style ads every month, tested in a structure that finds winners fast."],
      ["Simple, modern account structure", "Fewer, broader campaigns with Advantage+ where it fits, so Meta’s delivery system has the data it needs."],
      ["Lead quality, not just volume", "Lead forms with qualifying questions, CRM sync and conversion leads optimization, so your clients get leads that answer the phone."],
      ["Works in your Business Manager", "Assets stay in your agency’s or your client’s Business Manager. We get partner access only."],
      ["Branded reporting", "Weekly updates and monthly reports with your logo, built around leads, cost per lead, sales and ROAS."],
    ],
    includedTitle: "What’s included in white label Meta ads",
    included: [
      "Account and pixel audit",
      "Audience, offer and funnel strategy",
      "Facebook, Instagram, Messenger and Reels campaigns",
      "Static, video and UGC-style creatives",
      "Meta Pixel and Conversions API setup",
      "Instant forms with CRM integration",
      "Weekly optimization and creative refreshes",
      "Monthly branded reports",
    ],
    steps: [
      ["Branded audit", "We review one client’s ad account, pixel and creatives and send an audit with your logo."],
      ["Tracking & creatives", "We set up Conversions API, then build campaigns and the first round of creatives."],
      ["Test & scale", "Weekly optimization and new creatives every month. We scale budget only when results support it."],
    ],
    article: [
      [
        "How white label Meta ads management works",
        [
          "Your agency or your client owns the Business Manager, ad account, pixel and pages. We get partner access to the assets we need, so nothing moves out of your control. From there we plan the campaigns, produce the creatives, launch, and optimize every week.",
          "You get a weekly update and a monthly report with your branding for each client. If your client wants a call, we join as members of your team.",
        ],
      ],
      [
        "Creatives are the targeting now",
        [
          "Since Meta moved most targeting into its own delivery system, the creative decides who sees the ad. That is why every white label Meta account we run includes creative production: static designs, short edited videos and UGC-style ads, refreshed every month.",
          "We test creatives in a structure that gives each new ad a fair budget, then move winners into scaling campaigns. Your clients see a steady flow of new ads instead of the same three images for six months.",
        ],
      ],
      [
        "Conversions API and lead quality",
        [
          "Browser tracking misses a large share of conversions because of iOS privacy changes and ad blockers. We set up Meta Conversions API — through server-side Tag Manager, a platform integration or the CRM — with proper event matching and deduplication, so Meta optimizes on more complete data.",
          "For lead-gen clients, we connect Meta lead forms or landing pages to the CRM and send qualified-lead events back to Meta. That trains the algorithm to find people who actually book, not people who tap a form by accident.",
        ],
      ],
      [
        "Industries we know",
        [
          "We have run Meta campaigns for [dental](/white-label-dental-ppc) and healthcare practices, home services, real estate, moving companies, supplements and D2C e-commerce brands, as well as B2B and B2C companies. If your agency specializes in one of these, we already know which offers and creatives work.",
        ],
      ],
    ],
    faqs: [
      ["Do you create the ad creatives?", "Yes. Static designs, edited video ads and UGC-style creatives are included, with new ones every month."],
      ["Who owns the Business Manager and pixel?", "Your agency or your client. We only need partner access to the ad account, pixel and page."],
      ["Do you set up Meta Conversions API?", "Yes, on every account — through server-side Tag Manager, a platform integration (Shopify, WordPress) or the CRM."],
      ["Can you run Instagram-only campaigns?", "Yes. We can run campaigns on Instagram only, or across Facebook, Instagram, Messenger and Audience Network."],
      ["Will my client know a white label partner runs their ads?", "No. Everything is branded as your agency, and we sign an NDA."],
    ],
  },
  {
    slug: "white-label-tracking",
    navLabel: "White Label Tracking",
    metaTitle: "White Label Conversion Tracking & Server-Side Tracking",
    metaDescription:
      "White label conversion tracking for agencies: GA4, Google Tag Manager, server-side tracking, Meta Conversions API, enhanced conversions and offline imports — set up under your brand.",
    keywords: [
      "white label conversion tracking",
      "white label server-side tracking",
      "Conversions API setup for agencies",
      "CAPI setup for agencies",
      "white label GA4 setup",
      "server-side tracking for agencies",
    ],
    serviceType: "White label conversion tracking and server-side tracking",
    eyebrow: "White label tracking",
    h1: ["White label tracking that ", "fixes your clients’ data."],
    lead:
      "Broken tracking is the hidden reason most ad accounts underperform. We set up GA4, Google Tag Manager, server-side tracking, Meta Conversions API, enhanced conversions and offline imports for your clients — delivered under your agency’s brand.",
    checks: [
      "GA4, GTM and server-side GTM",
      "Meta CAPI, Google enhanced conversions, TikTok Events API",
      "CRM and offline conversion imports",
    ],
    formTitle: "Get a free tracking audit",
    whyTitle: "Why agencies send us their tracking work",
    whyIntro:
      "Tracking is specialist work most agencies don’t have in-house. Our founders come from AdTech and tracking roles, so this is the service we know best — and the one most white label providers don’t offer.",
    why: [
      ["Server-side tracking", "Server-side Google Tag Manager (on Stape or Google Cloud), first-party data collection and longer-lived cookies."],
      ["Meta Conversions API", "Pixel plus CAPI with event IDs for deduplication and strong event match quality."],
      ["Google enhanced conversions", "Hashed first-party data sent with conversions, so Google can match more of them to ad clicks."],
      ["Offline conversions", "Booked appointments and closed deals from the CRM sent back to Google and Meta, so bidding optimizes for revenue."],
      ["Clean GA4 setup", "Events, key events, cross-domain tracking and consent mode, documented so your team can maintain it."],
      ["Documented and handed over", "Every setup comes with a short branded document of what was installed and how to check it."],
    ],
    includedTitle: "What’s included in white label tracking",
    included: [
      "Tracking audit of the site, tags and ad platforms",
      "GA4 and Google Tag Manager setup or cleanup",
      "Server-side Tag Manager setup",
      "Meta Conversions API with deduplication",
      "Google Ads enhanced conversions",
      "TikTok, Microsoft and LinkedIn conversion tags",
      "Call tracking and form tracking",
      "CRM and offline conversion imports",
    ],
    steps: [
      ["Tracking audit", "We test what fires, what is missing and what is double-counted, and send a branded report."],
      ["Fix & build", "We install or repair GA4, GTM, server-side tracking, CAPI and offline imports."],
      ["Verify & document", "We check every conversion in each platform and hand over a branded setup document."],
    ],
    article: [
      [
        "Why conversion tracking matters more than ever",
        [
          "Google and Meta now decide who sees an ad based on the conversions they are told about. When tracking misses conversions — because of iOS privacy changes, ad blockers, broken tags or forms that don’t fire — the algorithms optimize on bad data, and cost per lead goes up.",
          "Fixing tracking is often the fastest way to improve an account your agency already manages. It doesn’t need a bigger budget. It just lets the ad platforms see what is really happening.",
        ],
      ],
      [
        "What server-side tracking does",
        [
          "Normal tracking runs in the visitor’s browser, where it can be blocked or cut short. Server-side tracking sends events from your client’s own server or a tagging server instead. Data is collected under your client’s domain, cookies last longer, and conversions reach Google and Meta more reliably.",
          "We set up server-side Google Tag Manager on Stape or Google Cloud, connect it to GA4, Google Ads, Meta CAPI and other platforms, and configure consent so it respects privacy rules.",
        ],
      ],
      [
        "Offline conversions: optimize for revenue",
        [
          "For lead-gen clients, the conversion that matters happens after the form: the booked appointment, the signed contract, the sale. We connect the CRM — GoHighLevel, HubSpot, Salesforce or others — and send those outcomes back to Google Ads and Meta as offline conversions.",
          "That way the platforms learn which clicks turn into customers, not just which turn into form fills. It is one of the biggest improvements we make for dental, healthcare and home service clients.",
        ],
      ],
      [
        "Tracking as a white label service",
        [
          "You can sell tracking as a one-off setup project, as part of onboarding a new PPC client, or as a monthly maintenance add-on. We deliver it under your brand, with an audit and setup document carrying your logo. Many agencies use our tracking audit as a door-opener with prospects: it shows a problem the current agency missed.",
        ],
      ],
    ],
    faqs: [
      ["What is server-side tracking?", "Server-side tracking sends conversion data from a server you control instead of only from the visitor’s browser. It is less affected by ad blockers and browser limits, so more conversions reach Google and Meta."],
      ["Do you set up Meta Conversions API?", "Yes, with event deduplication and event match quality checks, through server-side GTM, a platform integration or the CRM."],
      ["Which platforms do you track for?", "Google Ads, GA4, Meta, Microsoft Ads, LinkedIn and TikTok, plus call tracking tools and CRMs like GoHighLevel, HubSpot and Salesforce."],
      ["Can you fix tracking on an account another team runs?", "Yes. Tracking can be a standalone project, even if your agency or another partner manages the ads."],
      ["Is tracking setup privacy compliant?", "We configure Google Consent Mode and consent-based tag firing. Your client remains responsible for their privacy policy and cookie banner, which we can advise on."],
    ],
  },
  {
    slug: "white-label-microsoft-ads",
    navLabel: "White Label Microsoft Ads",
    metaTitle: "White Label Microsoft Ads (Bing Ads) for Agencies",
    metaDescription:
      "White label Microsoft Advertising (Bing Ads) management for agencies. We import, rebuild and optimize your clients’ Microsoft Ads under your brand. Lower CPCs, same buyers.",
    keywords: ["white label Microsoft Ads", "white label Bing Ads", "Bing Ads management for agencies", "Microsoft Advertising white label"],
    serviceType: "White label Microsoft Advertising management",
    eyebrow: "White label Microsoft Ads",
    h1: ["White label Microsoft Ads: ", "cheaper clicks for your clients."],
    lead:
      "Microsoft Advertising reaches searchers on Bing, Yahoo, DuckDuckGo, Copilot and the Microsoft network — often at a lower cost per click than Google. We set up and manage it for your clients under your agency’s brand.",
    checks: [
      "Search, Performance Max and Audience Ads",
      "Google Ads imports, cleaned and rebuilt",
      "LinkedIn profile targeting for B2B",
    ],
    formTitle: "Get a free Microsoft Ads review",
    whyTitle: "Why add Microsoft Ads for your clients",
    whyIntro:
      "Microsoft Ads is the easiest new channel to add to a client already running Google Ads. The searches are the same, the competition is usually lower, and the audience skews older and higher-income.",
    why: [
      ["Lower cost per click", "Fewer advertisers bid on Microsoft, so CPCs are often lower than on Google for the same keywords."],
      ["Smart imports, not copies", "We import from Google Ads, then fix bids, budgets, match types and assets that don’t translate well."],
      ["B2B targeting", "LinkedIn profile targeting by company, industry and job function — only available on Microsoft search ads."],
      ["Copilot and the Microsoft network", "Ads can appear in Microsoft Copilot, Bing, Edge, MSN and partner sites."],
      ["UET and offline conversions", "Microsoft UET tag, enhanced conversions and offline imports, so bidding is based on real results."],
      ["One report with Google", "Combined branded reporting, so your client sees all search results in one place."],
    ],
    includedTitle: "What’s included in white label Microsoft Ads",
    included: [
      "Account setup under your agency’s manager account",
      "Google Ads import and cleanup",
      "Search, Performance Max, Shopping and Audience Ads",
      "LinkedIn profile targeting for B2B clients",
      "UET tag, conversion goals and offline imports",
      "Weekly optimization",
      "Monthly branded reports",
    ],
    steps: [
      ["Opportunity check", "We look at the client’s Google Ads data and estimate what Microsoft Ads could add."],
      ["Import & rebuild", "We import, clean up and adjust campaigns for Microsoft’s auction and audience."],
      ["Manage & report", "Weekly optimization and branded reporting next to Google results."],
    ],
    article: [
      [
        "Why Microsoft Ads is an easy upsell",
        [
          "Most of your Google Ads clients are not on Microsoft Ads yet. That is a simple upsell: the keywords and ads already exist, setup is quick, and the extra leads usually cost less than on Google. For agencies, it is one of the fastest ways to grow revenue from existing clients.",
          "Microsoft’s audience on desktop search skews toward older, higher-income and business users — a good fit for professional services, home services, healthcare and B2B.",
        ],
      ],
      [
        "We don’t just click “import”",
        [
          "Importing a Google Ads account into Microsoft is easy; making it perform is not. Budgets, bids, match types, location settings and assets often need changing because Microsoft’s traffic and auction are different. We import, then review every campaign and adjust it for Microsoft.",
          "For B2B clients, we add LinkedIn profile targeting — adjusting bids by company, industry or job function — which isn’t possible on Google.",
        ],
      ],
      [
        "Tracking and reporting",
        [
          "We install the Microsoft UET tag through Google Tag Manager, set up conversion goals and, where the client uses a CRM, offline conversion imports. Results go into the same branded report as [Google Ads](/white-label-google-ads), so your client sees one clear picture of search performance.",
        ],
      ],
    ],
    faqs: [
      ["Is Microsoft Ads the same as Bing Ads?", "Yes. Bing Ads was renamed Microsoft Advertising. Ads show on Bing, Yahoo, DuckDuckGo, Microsoft Copilot, MSN and partner sites."],
      ["Is Microsoft Ads worth it for small businesses?", "Often, yes. Volume is lower than Google, but clicks are usually cheaper, so it can add leads at a lower cost per lead."],
      ["Can you import our Google Ads campaigns?", "Yes. We import them and then adjust budgets, bids, match types and assets for Microsoft’s auction."],
      ["Do you need our Microsoft Ads manager account?", "We can work inside your agency’s Microsoft Ads manager account, or set one up for you."],
    ],
  },
  {
    slug: "white-label-linkedin-ads",
    navLabel: "White Label LinkedIn Ads",
    metaTitle: "White Label LinkedIn Ads Management for Agencies",
    metaDescription:
      "White label LinkedIn Ads for agencies with B2B clients. Lead gen forms, account-based targeting, creatives and CRM sync — managed under your agency’s brand.",
    keywords: ["white label LinkedIn ads", "white label LinkedIn ads management", "LinkedIn ads for agencies", "B2B paid media white label"],
    serviceType: "White label LinkedIn Ads management",
    eyebrow: "White label LinkedIn Ads",
    h1: ["White label LinkedIn Ads for your ", "B2B clients."],
    lead:
      "LinkedIn is where B2B buyers can be targeted by company, job title and seniority. We run LinkedIn Ads for your agency’s B2B clients — strategy, creatives, lead gen forms and CRM sync — under your brand.",
    checks: [
      "Job title, company and industry targeting",
      "Lead gen forms synced to the CRM",
      "Account-based marketing campaigns",
    ],
    formTitle: "Get a free LinkedIn Ads plan",
    whyTitle: "LinkedIn Ads done without wasting budget",
    whyIntro:
      "LinkedIn clicks cost more than on other platforms, so mistakes are expensive. Tight targeting, strong offers and proper lead follow-up make the difference between an expensive test and a reliable pipeline.",
    why: [
      ["Precise B2B targeting", "Job titles, functions, seniority, company size, industry and named-account lists."],
      ["Offers that earn the lead", "Guides, audits, demos and webinars matched to each buyer stage."],
      ["Lead gen forms + CRM", "LinkedIn lead forms synced to HubSpot, Salesforce or GoHighLevel, so sales follows up fast."],
      ["Account-based marketing", "Company list targeting and retargeting to warm up the accounts your client’s sales team wants."],
      ["Conversion tracking", "Insight Tag and Conversions API, so results are measured in leads and pipeline."],
      ["Branded reporting", "Cost per lead, lead quality and pipeline in a branded report your client understands."],
    ],
    includedTitle: "What’s included in white label LinkedIn Ads",
    included: [
      "Audience and offer strategy",
      "Sponsored content, video, document and message ads",
      "Lead gen forms and CRM integration",
      "Company list and retargeting audiences",
      "Insight Tag and Conversions API",
      "Creative and copy testing",
      "Monthly branded reports",
    ],
    steps: [
      ["Strategy", "We define the target accounts, job titles and offer with you and your client."],
      ["Launch", "We build campaigns, creatives and lead forms, and connect them to the CRM."],
      ["Optimize", "We test audiences and creatives every week and report on leads and pipeline."],
    ],
    article: [
      [
        "When LinkedIn Ads is the right channel",
        [
          "LinkedIn Ads work best for B2B companies with a high customer value: software, professional services, recruiting, manufacturing, finance and education. If one new client is worth thousands, a higher cost per lead on LinkedIn is easily justified.",
          "For low-ticket or consumer offers, Meta and Google are usually a better use of budget — and we’ll tell you that honestly before your client spends.",
        ],
      ],
      [
        "How we run LinkedIn campaigns",
        [
          "We start with the client’s ideal customer: industries, company sizes and the job titles that buy. Then we match an offer to each stage — a guide or checklist for cold audiences, a demo or consultation for warm ones — and build campaigns with sponsored content, video, document ads and lead gen forms.",
          "Leads sync straight into the CRM so the sales team can follow up within minutes. Our co-founder Partho Sharothi Paul has led full-funnel Meta, Google and LinkedIn strategy for brands like ASUS and Yamaha.",
        ],
      ],
      [
        "Measuring what matters",
        [
          "We install the LinkedIn Insight Tag and Conversions API, and report on cost per lead, lead quality and — where the CRM allows — pipeline and revenue. Your client sees results in business terms, in a report with your agency’s logo.",
        ],
      ],
    ],
    faqs: [
      ["Is LinkedIn advertising worth it?", "For B2B companies with a high customer value, usually yes. Clicks cost more than on Meta or Google, but the targeting by job title and company is unique."],
      ["What budget do LinkedIn Ads need?", "We recommend at least $2,000–$3,000 a month in ad spend per client to test audiences and offers properly."],
      ["Can you sync LinkedIn leads with our client’s CRM?", "Yes. We connect LinkedIn lead gen forms to HubSpot, Salesforce, GoHighLevel and others, directly or through Zapier or Make."],
      ["Do you create the ad creatives?", "Yes. Images, short videos and document ads are included."],
    ],
  },
  {
    slug: "white-label-dental-ppc",
    navLabel: "White Label Dental PPC",
    metaTitle: "White Label Dental PPC for Dental Marketing Agencies",
    metaDescription:
      "White label dental PPC for agencies: Google Ads, Local Services Ads and Meta ads for dental practices, run under your brand. Implant, Invisalign and new-patient campaigns.",
    keywords: ["white label dental PPC", "white label dental marketing", "dental Google Ads white label", "dental PPC for agencies"],
    serviceType: "White label dental PPC",
    eyebrow: "White label dental PPC",
    h1: ["White label dental PPC for ", "dental marketing agencies."],
    lead:
      "We run Google Ads, Local Services Ads and Meta ads for your dental clients — new patients, implants, Invisalign and emergency visits — under your agency’s brand. Booked appointments, not just clicks.",
    checks: [
      "New-patient, implant, Invisalign & emergency campaigns",
      "Call tracking and booking tracking",
      "HIPAA-aware tracking setup",
    ],
    formTitle: "Get a free dental account audit",
    whyTitle: "Dental PPC from a team that knows dental",
    whyIntro:
      "Dental is one of the industries we know best. We have run campaigns for dental practices and groups, and we build every account around the number practices care about: booked new patients.",
    why: [
      ["High-value treatment campaigns", "Separate campaigns for implants, Invisalign, veneers and emergency care, each with its own landing page and offer."],
      ["Local Services Ads", "Google-screened Local Services Ads for dentists, managed alongside Search."],
      ["Calls and bookings tracked", "Call tracking, booking-widget tracking and offline imports from the practice software or CRM."],
      ["Privacy-aware tracking", "Tracking set up to keep patient health information out of ad platforms."],
      ["Meta for demand", "Facebook and Instagram campaigns with treatment offers, financing messages and before-and-after style creative within policy."],
      ["Branded reporting", "New-patient leads, cost per booking and calls, in a report with your agency’s logo."],
    ],
    includedTitle: "What’s included in white label dental PPC",
    included: [
      "Google Search and Local Services Ads",
      "Meta ads for implants, Invisalign and new patients",
      "Treatment-specific landing page recommendations",
      "Call tracking and booking tracking",
      "Offline conversion imports",
      "Google Business Profile optimization tips",
      "Weekly optimization",
      "Monthly branded reports",
    ],
    steps: [
      ["Practice audit", "We review the practice’s ads, tracking and landing pages and send a branded audit."],
      ["Build by treatment", "Campaigns, landing pages and tracking for each high-value treatment."],
      ["Book & report", "Weekly optimization and monthly reports on calls, leads and booked patients."],
    ],
    article: [
      [
        "Why dental PPC needs a specialist",
        [
          "Dental is competitive and expensive: implant and Invisalign keywords can cost more per click than almost any other local service. Generic PPC management wastes budget on the wrong searches. Dental PPC needs campaigns split by treatment, offers that match how patients choose, and tracking that follows a lead all the way to a booked appointment.",
        ],
      ],
      [
        "How we run dental campaigns",
        [
          "Each high-value treatment gets its own campaign, ad copy and landing page: implants, Invisalign, veneers, emergency dental and general new-patient visits. On Google we run Search and Local Services Ads; on Meta we run treatment offers and financing messages to people nearby.",
          "Every call and online booking is tracked, and — where the practice software or CRM allows — booked appointments are sent back to Google and Meta, so the platforms optimize for real patients.",
        ],
      ],
      [
        "Privacy and ad policies",
        [
          "Healthcare advertising has extra rules. We keep patient health information out of ad-platform tracking, follow Google’s and Meta’s healthcare ad policies, and avoid personal-attribute targeting. Your client stays responsible for HIPAA compliance; we set up tracking to support it.",
          "See examples of our dental campaigns and results on our [dental marketing page](/dental).",
        ],
      ],
    ],
    faqs: [
      ["Do you have dental experience?", "Yes. Dental is one of our main industries. See our dental page for campaign examples and results."],
      ["Do you run Google Local Services Ads for dentists?", "Yes. We set up and manage Local Services Ads alongside Search campaigns."],
      ["Is your tracking HIPAA compliant?", "We set up tracking to keep patient health information out of ad platforms. Final HIPAA compliance remains the practice’s responsibility."],
      ["Can you track booked appointments?", "Yes, through call tracking, booking-widget tracking and offline imports from the practice’s software or CRM where possible."],
    ],
  },
];

export const getWhiteLabelPage = (slug) => WHITE_LABEL_PAGES.find((p) => p.slug === slug) || null;
