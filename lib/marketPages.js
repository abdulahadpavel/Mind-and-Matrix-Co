// Location landing pages for our target markets. Rendered through components/ServicePage.js:
//   WHITE_LABEL_MARKETS → /white-label/<slug>  (for marketing agencies in that market)
//   DENTAL_MARKETS      → /dental/<slug>       (for dental practices in that market)
// `area` feeds the Service schema's areaServed. `article` paragraphs may hold [text](/path) links.

export const WHITE_LABEL_MARKETS = [
  {
    slug: "new-york",
    navLabel: "New York",
    area: { "@type": "State", name: "New York" },
    metaTitle: "White Label Advertising Agency in New York",
    metaDescription:
      "White label PPC and paid media for New York agencies. Google, Meta, Microsoft and LinkedIn ads run under your brand, with overnight turnaround from our team. NDA, wholesale pricing.",
    keywords: [
      "white label advertising agency New York",
      "white label PPC New York",
      "white label agency NYC",
      "white label Google Ads New York",
      "outsource PPC New York agency",
    ],
    serviceType: "White label paid media for New York agencies",
    eyebrow: "White label · New York",
    h1: ["White label advertising agency ", "for New York agencies."],
    lead:
      "New York agencies win clients faster than they can hire senior media buyers. We work as your behind-the-scenes ad team — Google, Meta, Microsoft and LinkedIn campaigns, creatives and tracking — fully under your agency’s brand.",
    checks: [
      "Overnight turnaround: we work while New York sleeps",
      "Campaigns for Manhattan, Brooklyn, Queens, Long Island & upstate",
      "NDA, wholesale pricing, month to month",
    ],
    formTitle: "Get a free proposal for your New York agency",
    whyTitle: "Why New York agencies outsource paid media to us",
    whyIntro:
      "New York is one of the most expensive places in the world to hire and keep paid media talent, and one of the most competitive ad markets. A white label partner gives you senior capacity without the payroll.",
    why: [
      ["Senior capacity, no NYC salary", "Add experienced Google, Meta and Microsoft buyers for a wholesale fee per account instead of a full New York salary and benefits."],
      ["Overnight turnaround", "Dhaka is 10–11 hours ahead of New York. Send requests at the end of your day and wake up to finished work."],
      ["Built for high CPCs", "Tight keyword control, negative lists and bid strategies for one of the most expensive click markets in the US."],
      ["Hyper-local targeting", "Borough, zip-code and radius targeting across Manhattan, Brooklyn, Queens, the Bronx, Staten Island, Long Island and Westchester."],
      ["Industries New York agencies serve", "Legal, healthcare, dental, real estate, restaurants, professional services and e-commerce."],
      ["Your brand only", "Reports, audits and dashboards carry your logo. We join client calls as your team, if you want us there."],
    ],
    includedTitle: "What New York agencies get",
    included: [
      "Google Ads, Meta, Microsoft, LinkedIn and TikTok campaigns",
      "Local Services Ads for New York service businesses",
      "Ad creatives and landing pages",
      "Conversion tracking, call tracking and offline imports",
      "Weekly optimization and monthly branded reports",
      "Free branded audits for prospects you’re pitching",
    ],
    steps: [
      ["Partner call & NDA", "A call at a time that suits New York, then an NDA before we see any account."],
      ["Free branded audit", "Send one client account; we return an audit with your logo, usually overnight."],
      ["Launch & manage", "We build and run the campaigns. You get weekly updates and monthly branded reports."],
    ],
    article: [
      [
        "White label PPC for New York agencies",
        [
          "Agencies in New York face a simple problem: clients want paid media, but good media buyers are expensive and hard to keep. As your white label partner, MindandMatrix Co. plans, launches and manages your clients’ [Google Ads](/white-label-google-ads), [Facebook and Instagram ads](/white-label-facebook-ads), [Microsoft Ads](/white-label-microsoft-ads) and [LinkedIn Ads](/white-label-linkedin-ads). You sell the service at your own price and keep the client relationship.",
          "Our team is in Dhaka, Bangladesh, 10–11 hours ahead of New York. That works in your favor: requests you send at 6pm are usually done when you start the next morning, and we keep agreed overlap hours for calls.",
        ],
      ],
      [
        "Running ads in the New York market",
        [
          "New York clicks are expensive, and audiences are dense. We target by borough, zip code and radius, split campaigns by service and neighborhood, and schedule ads around when your clients can actually take calls. For multi-location clients, we report by location so you can show each branch its results.",
          "For legal, healthcare and dental clients, we set up tracking that measures calls, forms and bookings without sending sensitive details to ad platforms. See our [white label tracking](/white-label-tracking) service.",
        ],
      ],
      [
        "How the partnership works",
        [
          "Start with a partner call and an NDA. Send one client account and we’ll return a free audit with your branding. When the client signs, we join their ad accounts through your agency’s manager access, fix tracking, and manage the campaigns every week. Read the full [white label partnership overview](/white-label).",
        ],
      ],
    ],
    faqs: [
      ["Do you work with marketing agencies in New York?", "Yes. We run white label Google, Meta, Microsoft and LinkedIn ads for New York agencies, under the agency’s brand, with an NDA and month-to-month terms."],
      ["How do time zones work with a New York agency?", "Dhaka is 10–11 hours ahead of New York. We agree overlap hours for calls, and requests sent at the end of your day are usually done by the next morning."],
      ["Can you target specific boroughs or neighborhoods?", "Yes. We target by borough, zip code, radius and city, and split campaigns so each area’s budget and results are clear."],
      ["How is white label pricing set for New York agencies?", "We charge a wholesale fee per client account or a monthly fee for a dedicated team. You set your retail price. Rates are shared on the partner call."],
      ["Will our New York clients know you are involved?", "No. Everything is branded as your agency and we sign an NDA."],
    ],
  },
  {
    slug: "canada",
    navLabel: "Canada",
    area: { "@type": "Country", name: "Canada" },
    metaTitle: "White Label Advertising Agency in Canada",
    metaDescription:
      "White label PPC for Canadian agencies in Toronto, Vancouver, Calgary, Montreal and Ottawa. Google, Meta and Microsoft ads in CAD, under your brand, with CASL-aware lead follow-up.",
    keywords: [
      "white label advertising agency Canada",
      "white label PPC Canada",
      "white label agency Toronto",
      "white label Google Ads Canada",
      "white label marketing Canada",
    ],
    serviceType: "White label paid media for Canadian agencies",
    eyebrow: "White label · Canada",
    h1: ["White label advertising agency ", "for Canadian agencies."],
    lead:
      "Canadian agencies use MindandMatrix Co. as their white label ad team. We run Google, Meta and Microsoft campaigns for your clients across Canada, with budgets and reports in Canadian dollars and your logo on everything.",
    checks: [
      "Toronto, Vancouver, Calgary, Montreal, Ottawa & more",
      "Budgets and reports in CAD",
      "CASL- and privacy-aware lead follow-up",
    ],
    formTitle: "Get a free proposal for your Canadian agency",
    whyTitle: "Why Canadian agencies work with us",
    whyIntro:
      "Senior media buyers in Toronto and Vancouver are expensive and in short supply. A white label partner lets you say yes to paid media without hiring — and scale with your client list.",
    why: [
      ["Add capacity without hiring", "Pay a wholesale fee per client account instead of a full-time Canadian salary."],
      ["Overnight turnaround", "Dhaka is 10–11 hours ahead of Toronto and 13–14 hours ahead of Vancouver, so end-of-day requests are done by morning."],
      ["Provincial and city targeting", "Campaigns targeted by province, city, postal code or radius, with separate budgets per region."],
      ["CASL-aware follow-up", "Lead forms and email or SMS follow-up set up with proper consent, in line with Canada’s Anti-Spam Legislation."],
      ["Privacy-aware tracking", "Consent-based tracking that respects PIPEDA and Quebec’s Law 25 consent requirements."],
      ["Reports in CAD", "Branded reports and dashboards in Canadian dollars, with your agency’s logo."],
    ],
    includedTitle: "What Canadian agencies get",
    included: [
      "Google Ads, Meta, Microsoft and LinkedIn campaigns",
      "Province, city and postal-code targeting",
      "Ad creatives and landing pages",
      "Consent-based conversion tracking",
      "CASL-aware lead forms and follow-up setup",
      "Weekly optimization and monthly reports in CAD",
    ],
    steps: [
      ["Partner call & NDA", "A call at a time that suits your province, then an NDA."],
      ["Free branded audit", "Send one client account; we return an audit with your logo."],
      ["Launch & manage", "We build and manage the campaigns and report in CAD under your brand."],
    ],
    article: [
      [
        "White label PPC for agencies across Canada",
        [
          "From Toronto and Ottawa to Calgary and Vancouver, Canadian agencies use us to deliver [white label PPC](/white-label-ppc) without building an in-house team. We run [Google Ads](/white-label-google-ads), [Meta ads](/white-label-facebook-ads) and [Microsoft Ads](/white-label-microsoft-ads) for your clients under your brand, with an NDA and month-to-month terms.",
          "Our team works overnight relative to Canada: Dhaka is 10–11 hours ahead of Toronto and 13–14 hours ahead of Vancouver. We agree overlap hours for calls, and most changes you request in the afternoon are finished by the next morning.",
        ],
      ],
      [
        "Canadian rules we build around",
        [
          "Canada’s Anti-Spam Legislation (CASL) requires consent before sending commercial emails and texts, so we set up lead forms with clear consent and follow-up flows that respect it. For tracking, we use consent-based setups suited to PIPEDA and to Quebec’s Law 25, which has stricter consent rules for tracking technologies.",
          "Quebec also requires French in commercial advertising. We can run French-language campaigns in Quebec using French copy from you or your translator, alongside English campaigns elsewhere.",
        ],
      ],
      [
        "Proof from Canada",
        [
          "For a single-dentist practice in Ontario, our local work reached a Top 3 Google Map Pack ranking for “dentist near me” in core postal areas, with 126% more calls from the profile. See our [dental results](/dental) and [case studies](/case-studies).",
        ],
      ],
    ],
    faqs: [
      ["Do you work with marketing agencies in Canada?", "Yes. We run white label Google, Meta and Microsoft ads for Canadian agencies in every province, under the agency’s brand."],
      ["Do you report in Canadian dollars?", "Yes. Budgets, results and branded reports are in CAD."],
      ["Is your lead follow-up CASL compliant?", "We set up consent-based lead forms and follow-up flows designed around CASL. Your agency and client stay responsible for final legal compliance."],
      ["Can you run French ads in Quebec?", "Yes, using French copy you or your translator provide. Quebec requires French in commercial advertising."],
      ["What time zones do you cover?", "All of Canada. Dhaka is 10–11 hours ahead of Toronto and 13–14 hours ahead of Vancouver; we agree overlap hours for calls."],
    ],
  },
  {
    slug: "california",
    navLabel: "California",
    area: { "@type": "State", name: "California" },
    metaTitle: "White Label Advertising Agency in California",
    metaDescription:
      "White label PPC for California agencies in Los Angeles, San Francisco, San Diego and Orange County. High-CPC Google, Meta and Microsoft campaigns with CCPA-aware tracking, under your brand.",
    keywords: [
      "white label advertising agency California",
      "white label PPC California",
      "white label agency Los Angeles",
      "white label agency San Francisco",
      "white label Google Ads California",
    ],
    serviceType: "White label paid media for California agencies",
    eyebrow: "White label · California",
    h1: ["White label advertising agency ", "for California agencies."],
    lead:
      "California has some of the most expensive clicks in the US, so every wasted dollar shows. We run tightly controlled, well-tracked Google, Meta and Microsoft campaigns for California agencies — under your brand, while your team sleeps.",
    checks: [
      "Los Angeles, Bay Area, San Diego, Orange County & Sacramento",
      "CCPA/CPRA-aware tracking and consent",
      "Overnight optimization (13–14 hours ahead)",
    ],
    formTitle: "Get a free proposal for your California agency",
    whyTitle: "Why California agencies work with us",
    whyIntro:
      "California agencies deal with high CPCs, strict privacy rules and expensive talent. We help with all three: careful budget control, privacy-aware tracking and senior capacity at a wholesale rate.",
    why: [
      ["Built for high CPCs", "Tight keyword control, negative lists and bidding that protect budget in expensive California markets."],
      ["CCPA/CPRA-aware tracking", "Consent setups that honor opt-outs and Global Privacy Control signals, with server-side tracking that limits data shared."],
      ["Overnight optimization", "Dhaka is 13–14 hours ahead of Los Angeles, so optimization happens while your team is offline."],
      ["Metro-level targeting", "Campaigns for Los Angeles, the Bay Area, San Diego, Orange County, Sacramento and the Inland Empire."],
      ["Senior capacity", "Experienced buyers for a wholesale fee per account instead of a California salary."],
      ["Your brand only", "Branded reports, dashboards and audits; we stay invisible to your clients."],
    ],
    includedTitle: "What California agencies get",
    included: [
      "Google Ads, Meta, Microsoft, LinkedIn and TikTok campaigns",
      "Performance Max and Shopping for e-commerce clients",
      "Ad creatives and landing pages",
      "CCPA-aware, server-side conversion tracking",
      "Weekly optimization and monthly branded reports",
      "Free branded audits for prospects",
    ],
    steps: [
      ["Partner call & NDA", "A call in your morning or evening, then an NDA."],
      ["Free branded audit", "Send one client account; we return an audit with your logo."],
      ["Launch & manage", "We build, launch and optimize overnight, with weekly updates to you."],
    ],
    article: [
      [
        "White label PPC for California agencies",
        [
          "From Los Angeles to the Bay Area, California agencies use MindandMatrix Co. as their white label paid media team. We manage [Google Ads](/white-label-google-ads), [Meta ads](/white-label-facebook-ads), [Microsoft Ads](/white-label-microsoft-ads) and [LinkedIn Ads](/white-label-linkedin-ads) for your clients under your brand, so you can sell more without hiring.",
          "Because Dhaka is 13–14 hours ahead of California, our working day is your night. Bids, budgets and creatives get attention while your team is offline, and we agree overlap hours for calls.",
        ],
      ],
      [
        "Privacy-aware tracking for California",
        [
          "The California Consumer Privacy Act, as amended by the CPRA, gives consumers the right to opt out of the sale or sharing of their data for cross-context advertising, and businesses must honor Global Privacy Control browser signals. We set up consent-based and [server-side tracking](/white-label-tracking) that respects these choices while still measuring leads and sales.",
        ],
      ],
      [
        "Proof from California",
        [
          "For a cosmetic and implant dental clinic in California, our Meta and YouTube campaigns brought an average of 38 implant consultations a month and reduced the average cost per implant consult to $1.2k. See more [dental results](/dental) and [case studies](/case-studies).",
        ],
      ],
    ],
    faqs: [
      ["Do you work with marketing agencies in California?", "Yes. We run white label paid media for California agencies, under the agency’s brand, with an NDA and month-to-month terms."],
      ["Is your tracking CCPA compliant?", "We set up consent-based tracking that honors opt-outs and Global Privacy Control. Your agency and client stay responsible for their privacy policy and overall compliance."],
      ["How do you handle high California CPCs?", "Tight keyword and location targeting, aggressive negative keywords, ad scheduling and bidding on real conversion data."],
      ["What hours do you work for California agencies?", "Dhaka is 13–14 hours ahead of Los Angeles. We agree overlap hours in your morning or evening and optimize overnight."],
    ],
  },
  {
    slug: "florida",
    navLabel: "Florida",
    area: { "@type": "State", name: "Florida" },
    metaTitle: "White Label Advertising Agency in Florida",
    metaDescription:
      "White label PPC for Florida agencies in Miami, Tampa, Orlando, Jacksonville and Fort Lauderdale. Seasonal budget planning, Spanish-language campaigns and branded reports.",
    keywords: [
      "white label advertising agency Florida",
      "white label PPC Florida",
      "white label agency Miami",
      "white label agency Tampa",
      "white label Google Ads Florida",
    ],
    serviceType: "White label paid media for Florida agencies",
    eyebrow: "White label · Florida",
    h1: ["White label advertising agency ", "for Florida agencies."],
    lead:
      "Florida demand rises and falls with the seasons — tourism, home services, healthcare and real estate all move. We help Florida agencies shift client budgets fast, under your brand, with reports your clients understand.",
    checks: [
      "Miami, Fort Lauderdale, Tampa, Orlando & Jacksonville",
      "Seasonal budget plans (snowbird & hurricane seasons)",
      "Spanish-language campaigns for bilingual markets",
    ],
    formTitle: "Get a free proposal for your Florida agency",
    whyTitle: "Why Florida agencies work with us",
    whyIntro:
      "Florida clients need campaigns that move with the calendar and reach both English- and Spanish-speaking customers. We bring the capacity and the planning, and you keep the client.",
    why: [
      ["Seasonal budget planning", "Plans built around snowbird season, spring break, hurricane season (June–November) and holidays."],
      ["Spanish-language campaigns", "Separate Spanish campaigns for Miami-Dade and other bilingual markets, using copy reviewed by a native speaker on your side."],
      ["Metro-level targeting", "Miami, Fort Lauderdale, West Palm Beach, Tampa, Orlando and Jacksonville, each with its own budget."],
      ["Consent-aware follow-up", "Lead forms with clear consent for calls and texts, in line with Florida’s telephone solicitation rules."],
      ["Overnight turnaround", "Dhaka is 10–11 hours ahead of Miami, so end-of-day requests are done by morning."],
      ["Your brand only", "Branded reports and audits; we never contact your clients directly."],
    ],
    includedTitle: "What Florida agencies get",
    included: [
      "Google Ads, Meta, Microsoft and TikTok campaigns",
      "Local Services Ads for home service clients",
      "English and Spanish campaigns",
      "Seasonal budget plans and forecasts",
      "Call tracking and consent-based lead forms",
      "Weekly optimization and monthly branded reports",
    ],
    steps: [
      ["Partner call & NDA", "A call that suits Eastern Time, then an NDA."],
      ["Free branded audit", "Send one client account; we return an audit with your logo and a seasonal plan."],
      ["Launch & manage", "We run the campaigns and move budget with the season."],
    ],
    article: [
      [
        "White label PPC for Florida agencies",
        [
          "Florida agencies use MindandMatrix Co. as a white label ad team for clients in home services, home care, healthcare, dental, real estate, hospitality and e-commerce. We run [Google Ads](/white-label-google-ads), [Meta ads](/white-label-facebook-ads) and [Microsoft Ads](/white-label-microsoft-ads) under your brand, with an NDA and month-to-month terms.",
        ],
      ],
      [
        "Planning around Florida’s seasons",
        [
          "Many Florida businesses see demand swing through the year: winter residents arrive in the cooler months, tourism peaks around holidays and spring break, and hurricane season (June 1 to November 30) changes what home service and insurance clients need. We plan budgets around these patterns, so clients spend more when demand is high and protect budget when it drops.",
        ],
      ],
      [
        "Lead follow-up and consent",
        [
          "Florida’s Telephone Solicitation Act sets rules on automated calls and texts to consumers. When your clients follow up leads by phone or SMS, we set up lead forms with clear consent wording and keep records of when consent was given. Your client remains responsible for how they follow up, and we’ll flag anything that looks risky.",
          "Every account gets [conversion tracking](/white-label-tracking) for calls, forms and bookings, so you can show Florida clients exactly which campaigns bring customers.",
        ],
      ],
    ],
    faqs: [
      ["Do you work with marketing agencies in Florida?", "Yes. We run white label Google, Meta and Microsoft ads for Florida agencies, under the agency’s brand."],
      ["Can you run Spanish-language ads?", "Yes. We run separate Spanish campaigns for bilingual markets like Miami-Dade, using copy reviewed by a native speaker on your side."],
      ["How do you handle seasonal demand?", "We build a seasonal budget plan for each client and shift spend as demand changes through the year."],
      ["What time zone do you work in for Florida?", "Dhaka is 10–11 hours ahead of Miami. We agree overlap hours for calls and finish end-of-day requests overnight."],
    ],
  },
];

export const DENTAL_MARKETS = [
  {
    slug: "new-york",
    navLabel: "Dental Marketing in New York",
    area: { "@type": "State", name: "New York" },
    metaTitle: "Dental Marketing Agency in New York — Google & Facebook Ads",
    metaDescription:
      "Dental marketing for New York practices in Manhattan, Brooklyn, Queens, Long Island and upstate. Google Ads, Facebook ads and Google Business Profile with call and booking tracking.",
    keywords: [
      "dental marketing agency New York",
      "dental marketing NYC",
      "Google Ads for dentists New York",
      "dentist advertising New York",
      "dental PPC New York",
    ],
    serviceType: "Dental marketing for New York practices",
    eyebrow: "Dental marketing · New York",
    h1: ["Dental marketing for ", "New York practices."],
    lead:
      "New York patients have dozens of dentists within a few blocks. We help your practice stand out where they search — Google, Google Maps, Facebook and Instagram — and track every call and booking.",
    checks: [
      "Manhattan, Brooklyn, Queens, the Bronx, Staten Island, Long Island & upstate",
      "Implant, Invisalign, emergency & new-patient campaigns",
      "HIPAA-aware call and booking tracking",
    ],
    formTitle: "Get a free dental ads audit for your New York practice",
    whyTitle: "How we help New York dental practices grow",
    whyIntro:
      "In a dense, expensive market, the practices that win are the ones that target tightly, answer fast and know which ads bring patients. That’s how we run every New York account.",
    why: [
      ["Neighborhood targeting", "Ads aimed at the blocks and zip codes your patients actually come from, not the whole city."],
      ["Treatment campaigns", "Separate campaigns for implants, Invisalign, emergency care and new patients, each with its own budget."],
      ["Google Maps visibility", "Google Business Profile work so your practice shows up in the map for “dentist near me”."],
      ["Calls tracked to bookings", "Call and booking tracking, so you see cost per new patient — not just clicks."],
      ["Privacy-safe tracking", "Tracking set up so patient health information isn’t sent to Google or Meta."],
      ["Accurate, careful ads", "Factual ads that follow New York’s professional advertising rules for dentists — no guarantees or misleading claims."],
    ],
    includedTitle: "What’s included",
    included: [
      "Google Ads and Local Services Ads",
      "Facebook and Instagram ads",
      "Google Business Profile optimization",
      "Call tracking and booking tracking",
      "HIPAA-aware tracking setup",
      "Monthly report: calls, bookings and cost per patient",
    ],
    steps: [
      ["Free audit", "We review your ads, tracking, website and local competitors within 48 hours."],
      ["Build & track", "Treatment campaigns, Google Business Profile fixes and call and booking tracking."],
      ["Grow", "Weekly optimization and monthly reviews with your front desk on lead quality."],
    ],
    article: [
      [
        "Getting new patients in New York",
        [
          "New York is one of the most competitive dental markets in the country. Clicks for searches like “dentist near me” or “dental implants” are expensive, and patients compare several practices before booking. We focus budget where it counts: tight neighborhood targeting, treatment-specific campaigns and ads scheduled to the hours your team can answer the phone.",
          "We run [Google Ads for dentists](/dental/google-ads-for-dentists), [Facebook and Instagram ads](/dental/facebook-ads-for-dentists) and [Google Business Profile](/dental/google-business-profile) together, so your practice shows up at the top of search, in the map and in patients’ feeds.",
        ],
      ],
      [
        "Advertising rules and patient privacy",
        [
          "Dentists in New York are licensed by the State Education Department, and its professional-conduct rules limit misleading or exaggerated advertising. We keep ads factual, avoid guarantees and check offers with you before they run.",
          "Federal HIPAA rules apply to how patient information is handled, and standard ad pixels can leak health details. We set up [HIPAA-aware tracking](/dental/hipaa-tracking) that measures calls and bookings without sharing patient health information.",
        ],
      ],
    ],
    faqs: [
      ["Do you work with dental practices in New York?", "Yes. We run Google Ads, Facebook ads and Google Business Profile for practices across New York City, Long Island, Westchester and upstate New York."],
      ["How much should a New York dental practice spend on ads?", "New York clicks are expensive, so many practices start between $3,000 and $8,000 a month in ad spend, paid directly to Google or Meta. We recommend a budget after the free audit."],
      ["Can you target only my neighborhood?", "Yes. We target by zip code, radius and borough, so you only pay for patients who can realistically visit."],
      ["Is your tracking HIPAA-safe?", "We set up tracking so patient health information isn’t sent to ad platforms. Your compliance advisor should confirm your overall program."],
    ],
  },
  {
    slug: "canada",
    navLabel: "Dental Marketing in Canada",
    area: { "@type": "Country", name: "Canada" },
    metaTitle: "Dental Marketing Agency in Canada — Google & Facebook Ads",
    metaDescription:
      "Dental marketing for Canadian practices in Ontario, BC, Alberta and beyond. Google Ads, Facebook ads and Google Business Profile, written to fit provincial dental advertising rules.",
    keywords: [
      "dental marketing agency Canada",
      "dental marketing Toronto",
      "dental marketing Ontario",
      "Google Ads for dentists Canada",
      "dentist advertising Canada",
    ],
    serviceType: "Dental marketing for Canadian practices",
    eyebrow: "Dental marketing · Canada",
    h1: ["Dental marketing for ", "Canadian practices."],
    lead:
      "We help dental practices across Canada get more new patients from Google, Google Maps, Facebook and Instagram — with ads written to fit your provincial college’s advertising rules, and every call and booking tracked.",
    checks: [
      "Ontario, British Columbia, Alberta, Quebec & the Prairies",
      "Ads written for provincial advertising standards",
      "Budgets and reports in CAD",
    ],
    formTitle: "Get a free dental ads audit for your Canadian practice",
    whyTitle: "How we help Canadian dental practices grow",
    whyIntro:
      "Canadian dental advertising has extra rules, and patient privacy matters. We combine careful, compliant ads with local search work that brings real bookings.",
    why: [
      ["Provincial rules respected", "Ads written around your regulator’s standards, such as the RCDSO in Ontario — which limit testimonials and superlative claims."],
      ["Google Maps results", "Google Business Profile work that has taken an Ontario practice to the Top 3 in the map."],
      ["Treatment campaigns", "Implants, clear aligners, emergency care and new-patient campaigns, each with its own budget."],
      ["Calls and bookings tracked", "Call and booking tracking, so you know your cost per new patient."],
      ["Privacy-aware setup", "Consent-based tracking suited to PIPEDA and provincial health privacy laws like Ontario’s PHIPA."],
      ["CAD reporting", "Budgets and monthly reports in Canadian dollars."],
    ],
    includedTitle: "What’s included",
    included: [
      "Google Ads and Google Business Profile",
      "Facebook and Instagram ads",
      "Ad copy reviewed against provincial advertising standards",
      "Call tracking and booking tracking",
      "Consent-based, privacy-aware tracking",
      "Monthly report in CAD",
    ],
    steps: [
      ["Free audit", "We review your ads, Google Business Profile, tracking and local competitors."],
      ["Build & track", "Compliant campaigns, profile fixes and call and booking tracking."],
      ["Grow", "Weekly optimization and monthly reporting in CAD."],
    ],
    article: [
      [
        "Results from a Canadian practice",
        [
          "For a single-dentist practice in Ontario, our Google Business Profile and local SEO work reached a Top 3 Map Pack ranking for “dentist near me” in its core postal areas, with 126% more calls from the profile, 88% more direction requests and 64 new reviews. See all our [dental results](/dental).",
        ],
      ],
      [
        "Dental advertising rules in Canada",
        [
          "Each province’s dental regulator sets advertising standards. In Ontario, the Royal College of Dental Surgeons of Ontario (RCDSO) restricts things like patient testimonials and claims of superiority, and other provincial colleges have similar rules. We write ads and landing pages to fit your college’s standards and check them with you before they go live.",
          "If your practice accepts patients under the Canadian Dental Care Plan (CDCP), that can be a strong, factual message in local ads. We can build campaigns around it.",
        ],
      ],
      [
        "Privacy and tracking",
        [
          "We use consent-based tracking suited to PIPEDA and provincial health privacy laws such as Ontario’s PHIPA, and we keep patient health information out of ad platforms. See [how our privacy-safe tracking works](/dental/hipaa-tracking).",
        ],
      ],
    ],
    faqs: [
      ["Do you work with dental practices in Canada?", "Yes. We work with practices across Canada, including Ontario, British Columbia, Alberta and Quebec."],
      ["Do your ads follow provincial dental advertising rules?", "We write ads around your regulator’s standards, such as the RCDSO in Ontario, and review them with you. Final responsibility stays with the dentist."],
      ["Can you help us rank on Google Maps?", "Yes. For an Ontario practice, our work reached a Top 3 Map Pack ranking for “dentist near me” in core areas."],
      ["Do you report in Canadian dollars?", "Yes. Budgets and reports are in CAD."],
    ],
  },
  {
    slug: "california",
    navLabel: "Dental Marketing in California",
    area: { "@type": "State", name: "California" },
    metaTitle: "Dental Marketing Agency in California — Google & Facebook Ads",
    metaDescription:
      "Dental marketing for California practices in Los Angeles, the Bay Area, San Diego and Orange County. Implant and cosmetic campaigns, CCPA-aware tracking and booked-patient reporting.",
    keywords: [
      "dental marketing agency California",
      "dental marketing Los Angeles",
      "dental implant marketing California",
      "Google Ads for dentists California",
      "dentist advertising California",
    ],
    serviceType: "Dental marketing for California practices",
    eyebrow: "Dental marketing · California",
    h1: ["Dental marketing for ", "California practices."],
    lead:
      "California dental clicks are some of the most expensive in the country. We run implant, cosmetic and new-patient campaigns that are tightly targeted and fully tracked, so every dollar is measured in booked patients.",
    checks: [
      "Los Angeles, Bay Area, San Diego, Orange County & Sacramento",
      "Implant & cosmetic campaigns with proven results",
      "CCPA- and HIPAA-aware tracking",
    ],
    formTitle: "Get a free dental ads audit for your California practice",
    whyTitle: "How we help California dental practices grow",
    whyIntro:
      "We’ve run implant and cosmetic campaigns for a California clinic, and we know how to make high-cost clicks pay off: strong offers, qualified leads and fast follow-up.",
    why: [
      ["Proven implant results", "For a California implant clinic: 38 implant consults a month and a $1.2k average cost per consult."],
      ["Cosmetic campaigns", "Veneers, whitening and clear aligner campaigns for California’s cosmetic market."],
      ["Tight targeting", "Zip-code and radius targeting in expensive metros, so budget goes to patients who can visit."],
      ["Accurate advertising", "Ads written to avoid false or misleading claims under California’s healthcare advertising law."],
      ["Privacy-aware tracking", "Tracking that respects CCPA/CPRA choices and keeps patient health information out of ad platforms."],
      ["Booked-patient reporting", "Monthly reports on consults, bookings and cost per patient."],
    ],
    includedTitle: "What’s included",
    included: [
      "Google Ads and Local Services Ads",
      "Facebook, Instagram and YouTube ads",
      "Implant and cosmetic landing pages",
      "Lead qualification and follow-up setup",
      "CCPA- and HIPAA-aware tracking",
      "Monthly report on consults and bookings",
    ],
    steps: [
      ["Free audit", "We review your ads, tracking, website and local competitors."],
      ["Build & track", "Treatment campaigns, landing pages and consult tracking."],
      ["Grow", "Weekly optimization toward booked consultations."],
    ],
    article: [
      [
        "Results from a California clinic",
        [
          "For a cosmetic and implant clinic in California, our Meta and YouTube campaigns brought an average of 38 implant consultations a month, reduced the average cost per implant consult to $1.2k and achieved a 14.6% lead form conversion rate. See our [dental implant marketing](/dental/implant-marketing) approach.",
        ],
      ],
      [
        "California advertising and privacy rules",
        [
          "California’s Business and Professions Code section 651 prohibits false or misleading advertising by healthcare professionals, including dentists. We keep claims factual and offers clear, and review them with you before they run.",
          "The CCPA, as amended by the CPRA, gives Californians rights over how their data is used for advertising, and patient information is also protected by HIPAA and California’s medical privacy law. We set up [privacy-safe tracking](/dental/hipaa-tracking) that honors opt-outs and keeps health details out of ad platforms.",
        ],
      ],
    ],
    faqs: [
      ["Do you work with dental practices in California?", "Yes. We work with practices in Los Angeles, the Bay Area, San Diego, Orange County, Sacramento and across the state."],
      ["Do you have California dental results?", "Yes. For a California implant clinic, our Meta and YouTube campaigns brought 38 implant consults a month at a $1.2k average cost per consult."],
      ["How much should a California practice spend on ads?", "Many California practices start between $3,000 and $10,000 a month in ad spend, depending on the metro and treatments. We recommend a budget after the free audit."],
      ["Is your tracking CCPA and HIPAA aware?", "Yes. We honor privacy choices and keep patient health information out of ad platforms. Your compliance advisor should confirm your overall program."],
    ],
  },
  {
    slug: "florida",
    navLabel: "Dental Marketing in Florida",
    area: { "@type": "State", name: "Florida" },
    metaTitle: "Dental Marketing Agency in Florida — Google & Facebook Ads",
    metaDescription:
      "Dental marketing for Florida practices in Miami, Tampa, Orlando, Jacksonville and Fort Lauderdale. Google and Facebook ads, Spanish-language campaigns and Florida-compliant offers.",
    keywords: [
      "dental marketing agency Florida",
      "dental marketing Miami",
      "dental marketing Tampa",
      "Google Ads for dentists Florida",
      "dentist advertising Florida",
    ],
    serviceType: "Dental marketing for Florida practices",
    eyebrow: "Dental marketing · Florida",
    h1: ["Dental marketing for ", "Florida practices."],
    lead:
      "We help Florida dental practices reach new patients on Google, Google Maps, Facebook and Instagram — in English and Spanish — with offers that meet Florida’s advertising rules and every call and booking tracked.",
    checks: [
      "Miami, Fort Lauderdale, Tampa, Orlando & Jacksonville",
      "English and Spanish campaigns",
      "Florida-compliant free and discounted offers",
    ],
    formTitle: "Get a free dental ads audit for your Florida practice",
    whyTitle: "How we help Florida dental practices grow",
    whyIntro:
      "Florida practices serve year-round residents, seasonal winter residents and large Spanish-speaking communities. We build campaigns for all of them.",
    why: [
      ["Spanish-language ads", "Separate Spanish campaigns for Miami-Dade and other bilingual areas, using copy reviewed by your team."],
      ["Seasonal planning", "Budgets that follow your patient flow, including winter residents and holiday periods."],
      ["Compliant offers", "New-patient specials and free consultations with the disclaimer Florida law requires."],
      ["Treatment campaigns", "Implants, clear aligners, emergency care and new-patient campaigns."],
      ["Calls and bookings tracked", "Call and booking tracking, so you know your cost per new patient."],
      ["Privacy-safe tracking", "Tracking that keeps patient health information out of ad platforms."],
    ],
    includedTitle: "What’s included",
    included: [
      "Google Ads and Local Services Ads",
      "Facebook and Instagram ads in English and Spanish",
      "Google Business Profile optimization",
      "Offer wording checked for Florida’s disclaimer rule",
      "Call tracking and booking tracking",
      "Monthly report: calls, bookings and cost per patient",
    ],
    steps: [
      ["Free audit", "We review your ads, tracking, website and local competitors."],
      ["Build & track", "English and Spanish campaigns, compliant offers and call tracking."],
      ["Grow", "Weekly optimization and seasonal budget changes."],
    ],
    article: [
      [
        "Florida’s rule for free and discounted dental offers",
        [
          "Florida Statutes section 456.062 requires healthcare advertisements for free or discounted services to include a specific disclaimer about the patient’s right to refuse payment for other services. Many practices run “free consultation” or new-patient specials without it. We include the required wording in ads and landing pages, and check offers with you before they go live.",
        ],
      ],
      [
        "Reaching Florida’s patients",
        [
          "Miami-Dade, Broward and parts of Central Florida have large Spanish-speaking populations, so we run separate Spanish campaigns where it makes sense, with copy reviewed by your team. We also plan budgets around seasonal residents and holiday periods.",
          "We combine [Google Ads for dentists](/dental/google-ads-for-dentists), [Facebook ads](/dental/facebook-ads-for-dentists), [emergency dentist ads](/dental/emergency-dentist-ads) and [Google Business Profile](/dental/google-business-profile) work, all with [privacy-safe tracking](/dental/hipaa-tracking).",
        ],
      ],
    ],
    faqs: [
      ["Do you work with dental practices in Florida?", "Yes. We work with practices in Miami, Fort Lauderdale, West Palm Beach, Tampa, Orlando, Jacksonville and across Florida."],
      ["Do Florida dental ads need a disclaimer?", "Ads for free or discounted services need the disclaimer required by Florida Statutes section 456.062. We include it in your ads and landing pages."],
      ["Can you run Spanish-language dental ads?", "Yes, as separate campaigns with copy reviewed by your team."],
      ["How much should a Florida practice spend on ads?", "Many Florida practices start between $2,000 and $6,000 a month in ad spend. We recommend a budget after the free audit."],
    ],
  },
];

// Where a location (lib/locations.js id) links to: its market page if it has one, else its card on /white-label.
export const whiteLabelMarketHref = (id) =>
  WHITE_LABEL_MARKETS.some((m) => m.slug === id) ? `/white-label/${id}` : `/white-label#${id}`;
