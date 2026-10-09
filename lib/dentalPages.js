// Content for the dental service pages, written for practice owners (not agencies).
// Each page renders through components/ServicePage.js at /dental/<slug>.
// `article` is the long-form section: [heading, [paragraphs]]. Paragraphs may hold [text](/path) links.

// Results shown on /dental and every dental page. Practice names are private at our clients' request.
export const DENTAL_RESULTS = [
  {
    tags: ["Google Ads", "Meta Ads"],
    title: "Multi-location family dental group",
    place: "Texas, USA",
    big: "3.1x",
    bigLabel: "more booked new-patient appointments in 90 days",
    stats: [
      ["Cost per lead", "-42%"],
      ["Monthly leads", "180+"],
      ["Show-up rate", "71%"],
    ],
  },
  {
    tags: ["Meta Ads", "YouTube"],
    title: "Cosmetic & implant clinic",
    place: "California, USA",
    big: "$1.2k",
    bigLabel: "average cost per implant consult reduced to",
    stats: [
      ["Implant consults / mo", "38"],
      ["Lead form CVR", "14.6%"],
      ["Video view rate", "31%"],
    ],
  },
  {
    tags: ["Google Business Profile", "Local SEO"],
    title: "Single-dentist local practice",
    place: "Ontario, Canada",
    big: "Top 3",
    bigLabel: "Map Pack ranking for “dentist near me” in core zip codes",
    stats: [
      ["Calls from profile", "+126%"],
      ["Direction requests", "+88%"],
      ["New reviews", "+64"],
    ],
  },
];

export const DENTAL_PAGES = [
  {
    slug: "google-ads-for-dentists",
    navLabel: "Google Ads for Dentists",
    metaTitle: "Google Ads for Dentists — Dental PPC Management",
    metaDescription:
      "Google Ads management for dental practices: Search, Local Services Ads and Performance Max built around booked new patients. Call and booking tracking included. Free 48-hour audit.",
    keywords: ["Google Ads for dentists", "dental PPC agency", "Google Ads management for dentists", "dental PPC", "dentist Google Ads"],
    serviceType: "Google Ads management for dental practices",
    eyebrow: "Google Ads for dentists",
    h1: ["Google Ads for dentists that ", "fill the schedule."],
    lead:
      "Patients search Google when they’re ready to book: “dentist near me”, “emergency dentist”, “dental implants cost”. We put your practice at the top of those searches and measure success in booked appointments, not clicks.",
    checks: [
      "Search, Local Services Ads & Performance Max",
      "Separate campaigns for implants, aligners & emergencies",
      "Every call and online booking tracked",
    ],
    formTitle: "Get a free Google Ads audit for your practice",
    whyTitle: "How we run Google Ads for dental practices",
    whyIntro:
      "Dental clicks are expensive, so every dollar has to reach someone who can become a patient. We build accounts around the treatments you want more of and the area you actually serve.",
    why: [
      ["Campaigns by treatment", "Implants, clear aligners, emergency care, cosmetic and general new patients each get their own campaign, ads and budget."],
      ["Tight local targeting", "We advertise only where your patients come from — by radius, zip code or city — and adjust bids by distance and time of day."],
      ["Local Services Ads", "Google-screened ads that show above regular results and charge per lead, managed alongside Search."],
      ["No wasted searches", "Negative keyword lists block job seekers, dental students, DIY searches and free-care searches you can’t serve."],
      ["Calls tracked to bookings", "Call tracking, booking-widget tracking and front-desk feedback, so we know which ads bring patients."],
      ["You own everything", "The Google Ads account is in your practice’s name. We get access, and you can remove it at any time."],
    ],
    includedTitle: "What’s included",
    included: [
      "Free account audit and local competitor review",
      "Keyword research by treatment and location",
      "Search, Local Services Ads and Performance Max campaigns",
      "Ad copy and assets: calls, locations, offers, reviews",
      "Landing page recommendations for each treatment",
      "Call tracking and online booking tracking",
      "Weekly optimization",
      "Monthly report: calls, leads, bookings and cost per patient",
    ],
    steps: [
      ["Free audit", "We review your account, tracking and website and show where budget is being wasted — within 48 hours."],
      ["Set up tracking & campaigns", "We fix call and booking tracking, then build campaigns for the treatments you want to grow."],
      ["Optimize every week", "We cut what doesn’t book, add budget to what does, and review lead quality with your front desk."],
    ],
    article: [
      [
        "Why Google Ads works for dental practices",
        [
          "Most new patients find a dentist the same way: they search Google and call one of the first practices they see. Google Ads puts your practice in that spot today, while SEO can take months. For high-value treatments like implants and clear aligners, a single new patient can cover a month of ad spend.",
          "The catch is cost. Dental keywords are some of the most expensive local searches on Google, so a poorly built account burns budget fast. That’s why we split campaigns by treatment, target only your real service area and track every call.",
        ],
      ],
      [
        "How much should a dental practice spend on Google Ads?",
        [
          "Many single-location practices start between $1,500 and $5,000 a month in ad spend, depending on the city and the treatments they promote. Implant and emergency campaigns usually need more budget than general new-patient campaigns because clicks cost more.",
          "We’ll recommend a starting budget after the free audit, based on your local competition and how many new patients you can take. Ad spend is paid directly to Google from your own account.",
        ],
      ],
      [
        "Tracking that counts patients, not clicks",
        [
          "A click isn’t a patient, and neither is a form fill that never answers the phone. We track calls from ads and your website, online bookings and form submissions, and where your practice software allows, we send booked appointments back to Google — so the system learns which searches turn into patients.",
          "We set this up carefully so no patient health information is sent to Google. Read more on our [HIPAA-aware tracking page](/dental/hipaa-tracking).",
        ],
      ],
      [
        "Google Ads and your Google Business Profile",
        [
          "Ads and your Google Business Profile work together: ads win the top of the page, and your profile wins the map. Many practices get the best results running both. See [Google Business Profile for dentists](/dental/google-business-profile).",
        ],
      ],
    ],
    faqs: [
      ["How much do Google Ads cost for dentists?", "Many single-location practices spend $1,500–$5,000 a month on ads, paid directly to Google, plus a monthly management fee. We recommend a budget after the free audit."],
      ["How fast will I get new patients?", "Search ads usually bring calls in the first week. Results improve over the first 4–8 weeks as we cut wasted spend and the bidding learns from booked appointments."],
      ["Do I have to sign a long contract?", "No. We work month to month."],
      ["Who owns the Google Ads account?", "Your practice does. We get access to manage it, and you can remove us at any time."],
      ["Do you run Local Services Ads for dentists?", "Yes. We set up and manage Google Local Services Ads alongside Search campaigns where they’re available in your area."],
      ["Do you also build landing pages?", "Yes. We can build treatment pages or advise your web team. A page that matches the ad usually lowers cost per patient."],
    ],
  },
  {
    slug: "facebook-ads-for-dentists",
    navLabel: "Facebook Ads for Dentists",
    metaTitle: "Facebook & Instagram Ads for Dentists",
    metaDescription:
      "Facebook and Instagram ads for dental practices: implant, clear aligner, whitening and new-patient offers that bring booked consultations. Lead follow-up and tracking included.",
    keywords: ["Facebook ads for dentists", "Instagram ads for dentists", "dental Facebook ads", "Meta ads for dental practices", "do Facebook ads work for dentists"],
    serviceType: "Facebook and Instagram advertising for dental practices",
    eyebrow: "Facebook ads for dentists",
    h1: ["Facebook & Instagram ads that bring ", "new patients to your chair."],
    lead:
      "Most people aren’t searching for a dentist today — but they’d book whitening, aligners or implants with the right offer. We reach local adults on Facebook and Instagram and turn them into booked consultations.",
    checks: [
      "Implant, aligner, whitening & new-patient offers",
      "Lead forms with qualifying questions",
      "Fast follow-up so leads become bookings",
    ],
    formTitle: "Get a free Facebook ads plan for your practice",
    whyTitle: "Do Facebook ads work for dentists? Yes — done right.",
    whyIntro:
      "Facebook ads create demand rather than catching it. They work best for elective, high-value treatments and need two things most practices miss: a strong offer and fast follow-up.",
    why: [
      ["Offers people act on", "New-patient specials, free implant consultations, whitening offers and financing messages tested against each other."],
      ["Creative that looks local", "Short videos, before-and-after style images (within Meta’s rules) and photos of your real team and office."],
      ["Qualified leads", "Lead forms ask about the treatment, timing and insurance, so your front desk calls the right people first."],
      ["Speed to lead", "Leads go straight to your phone, email or CRM. We help set up instant text replies and a call script."],
      ["Privacy-safe tracking", "Meta Pixel and Conversions API set up without sending patient health information."],
      ["Clear reporting", "Leads, cost per lead, booked consults and show-up rate — not likes and reach."],
    ],
    includedTitle: "What’s included",
    included: [
      "Offer and audience strategy for your area",
      "Facebook and Instagram campaigns, including Reels",
      "Ad creatives: images, short videos and copy",
      "Instant forms or landing pages",
      "Lead delivery to your phone, email or CRM",
      "Meta Pixel and Conversions API setup",
      "Weekly optimization and new creatives every month",
      "Monthly report on leads, bookings and cost per patient",
    ],
    steps: [
      ["Pick the offer", "We choose the treatment and offer with the best chance of filling your schedule."],
      ["Launch & connect", "We launch the ads and connect leads to your front desk so nobody waits."],
      ["Test & improve", "New creatives every month, weekly optimization, and feedback from your team on lead quality."],
    ],
    article: [
      [
        "When Facebook ads are the right choice",
        [
          "Facebook and Instagram ads are strongest for elective treatments people think about before they search: implants, clear aligners, veneers, whitening and smile makeovers. They also work well for opening a new location or filling gaps in the hygiene schedule with a new-patient special.",
          "For emergency dental care, Google is usually better, because people search the moment they’re in pain. Many practices run both: [Google Ads](/dental/google-ads-for-dentists) for urgent demand, Facebook for elective treatments.",
        ],
      ],
      [
        "Why most dental Facebook ads get leads but no bookings",
        [
          "The most common complaint we hear is “we get leads, but they don’t book”. Usually the lead form is too easy, the offer attracts bargain hunters, or nobody calls the lead for hours. By then they’ve forgotten they asked.",
          "We fix all three: forms with one or two qualifying questions, offers built around value rather than “free”, and lead delivery that lets your front desk call within minutes. For a multi-location dental group in Texas running Google and Meta ads, booked new patients showed up 71% of the time.",
        ],
      ],
      [
        "Meta’s rules for healthcare ads",
        [
          "Meta restricts how health businesses can target and track. We don’t target people based on health conditions, we write ads that don’t imply personal health information, and we set up tracking so patient details aren’t shared. See our [HIPAA-aware tracking page](/dental/hipaa-tracking) for how we handle this.",
        ],
      ],
    ],
    faqs: [
      ["Do Facebook ads work for dentists?", "Yes, especially for elective treatments like implants, clear aligners and whitening, and for new-patient specials. Success depends on the offer and how fast leads are called."],
      ["How much should I spend on Facebook ads?", "Many practices start with $1,000–$3,000 a month in ad spend, paid directly to Meta. We recommend a budget after the free plan."],
      ["Can you use before-and-after photos?", "We can use them carefully within Meta’s advertising policies, which restrict some health-related imagery. We’ll advise what’s allowed."],
      ["How do leads reach my front desk?", "By email, text, a shared sheet or your CRM — whatever your team will actually check. We help set up instant replies too."],
      ["Do you make the ad creatives?", "Yes. Images, short videos and copy are included, with new creatives every month."],
    ],
  },
  {
    slug: "implant-marketing",
    navLabel: "Dental Implant Marketing",
    metaTitle: "Dental Implant Marketing — Implant Leads & Consults",
    metaDescription:
      "Dental implant marketing that brings qualified implant consultations: Google Ads, Facebook ads, financing offers and lead follow-up for implant and full-arch practices.",
    keywords: ["dental implant marketing", "dental implant leads", "implant patient acquisition", "full arch implant marketing", "All-on-4 marketing"],
    serviceType: "Dental implant marketing",
    eyebrow: "Dental implant marketing",
    h1: ["Dental implant marketing that books ", "qualified consultations."],
    lead:
      "Implant patients are worth thousands, but they research for weeks and compare on trust and price. We run Google and Facebook campaigns that find serious implant candidates and get them into your consultation chair.",
    checks: [
      "Single-tooth, multiple and full-arch implant campaigns",
      "Financing-led offers and qualifying questions",
      "Consults tracked from first click to booked visit",
    ],
    formTitle: "Get a free implant marketing audit",
    whyTitle: "What makes implant marketing different",
    whyIntro:
      "Implant cases are high-value and high-consideration. Patients worry about cost, pain and trust. Good implant marketing answers those worries before the consultation — and filters out people who aren’t ready.",
    why: [
      ["Google for active searchers", "Campaigns for “dental implants near me”, “implant cost” and full-arch searches, with ads that address price and financing."],
      ["Facebook for future patients", "Video ads and education that reach people missing teeth or struggling with dentures, before they start searching."],
      ["Financing up front", "Monthly-payment messaging and financing partners in the ads, so price doesn’t stop qualified patients."],
      ["Qualifying questions", "Forms ask about the number of teeth, timing and budget, so your coordinator calls the best leads first."],
      ["Consult tracking", "We track leads, booked consultations and shows, so we can lower cost per consult — not just cost per lead."],
      ["Patient education pages", "Landing pages that explain the procedure, recovery and cost ranges in plain language."],
    ],
    includedTitle: "What’s included",
    included: [
      "Implant offer and financing strategy",
      "Google Search campaigns for implant keywords",
      "Facebook and Instagram video and image ads",
      "Implant landing page recommendations or builds",
      "Lead qualification forms",
      "Lead delivery and follow-up setup",
      "Consult and show-up tracking",
      "Monthly report: cost per consult and booked cases",
    ],
    steps: [
      ["Audit & offer", "We review your current implant marketing and agree on the offer, financing message and budget."],
      ["Launch both channels", "Google captures active searchers; Facebook builds future demand."],
      ["Optimize for consults", "We optimize for booked and attended consultations, not cheap leads."],
    ],
    article: [
      [
        "How we generate dental implant leads",
        [
          "We run two kinds of campaigns together. On Google, we target people actively searching for implants, implant prices and full-arch options in your area. On Facebook and Instagram, we reach adults who match implant candidates with video and education, so they think of your practice first when they’re ready.",
          "For a California cosmetic and implant clinic, our Meta and YouTube campaigns brought an average of 38 implant consultations a month and reduced the average cost per implant consult to $1.2k.",
        ],
      ],
      [
        "Price and financing in the ads",
        [
          "Price is the biggest barrier to implant treatment. Hiding it makes leads less qualified; leading with it can attract only bargain hunters. We test messages around value, monthly payments and financing partners to find what brings patients who are ready to move forward.",
        ],
      ],
      [
        "From lead to consultation",
        [
          "Implant leads go cold fast. We help you set up instant replies, a simple call schedule for your treatment coordinator, and tracking for every booked and attended consultation. That data goes back to Google and Meta — without patient health information — so the ads keep finding better candidates. See how we keep tracking safe on our [HIPAA-aware tracking page](/dental/hipaa-tracking).",
        ],
      ],
    ],
    faqs: [
      ["How much does a dental implant lead cost?", "It varies by city and offer. We focus on cost per booked consultation instead, which is what drives revenue. For one California clinic we reduced it to an average of $1.2k per consult."],
      ["Do you market full-arch implants (All-on-4)?", "Yes. Full-arch campaigns need their own offers, education and qualifying questions, and we build them separately."],
      ["Should I show prices in implant ads?", "Often it helps to show a starting price or monthly payment. We test what works in your market."],
      ["How quickly will I see implant consultations?", "Google campaigns usually bring inquiries in the first weeks. Facebook implant campaigns often take 4–8 weeks to find the right audience and offer."],
    ],
  },
  {
    slug: "hipaa-tracking",
    navLabel: "HIPAA-Aware Tracking",
    metaTitle: "HIPAA-Aware Tracking for Dentists — Safe Ad Tracking",
    metaDescription:
      "HIPAA-aware ad tracking for dental practices: measure calls, forms and bookings from Google and Meta ads without sending patient health information to ad platforms.",
    keywords: ["HIPAA compliant tracking for dentists", "HIPAA compliant Google Ads tracking", "HIPAA Meta Pixel dental", "dental website tracking HIPAA", "server-side tracking healthcare"],
    serviceType: "HIPAA-aware conversion tracking for dental practices",
    eyebrow: "HIPAA-aware tracking",
    h1: ["Track your dental ads ", "without risking patient privacy."],
    lead:
      "Many dental websites send more data to Google and Meta than they should — sometimes including which treatment page a visitor viewed or what they typed in a form. We set up tracking that measures your ads without sharing patient health information.",
    checks: [
      "Audit of what your website sends to ad platforms",
      "Server-side tracking with data filtering",
      "Calls and bookings measured safely",
    ],
    formTitle: "Get a free tracking privacy check",
    whyTitle: "Why dental tracking needs extra care",
    whyIntro:
      "US health privacy guidance has made standard ad pixels risky on healthcare websites. Dental practices still need to know which ads bring patients — the answer is tracking designed for healthcare, not switching tracking off.",
    why: [
      ["Find the leaks", "We check every tag, pixel and form on your site to see what data is being sent and where."],
      ["Server-side filtering", "Server-side tracking lets us remove sensitive details before anything reaches Google or Meta."],
      ["No health details in events", "Conversion events say “lead” or “booking”, not which treatment or condition a visitor has."],
      ["Consent handled", "Google Consent Mode and consent-based tag firing, set up with your cookie banner."],
      ["Calls measured safely", "Call tracking that reports on calls without recording or sharing health information with ad platforms."],
      ["Documented", "A clear write-up of what is tracked, what isn’t, and why — useful for your compliance records."],
    ],
    includedTitle: "What’s included",
    included: [
      "Tracking and privacy audit of your website",
      "Removal or fixing of risky tags and pixels",
      "Server-side Google Tag Manager setup",
      "Filtered Meta Conversions API and Google Ads conversions",
      "GA4 setup with sensitive data excluded",
      "Consent Mode and cookie banner integration",
      "Call and booking tracking",
      "Written summary of the setup",
    ],
    steps: [
      ["Privacy check", "We scan your website and ad accounts and show you what is being sent today."],
      ["Rebuild tracking", "We remove risky tags and set up filtered, server-side tracking."],
      ["Verify & document", "We test every conversion and give you a plain-language summary."],
    ],
    article: [
      [
        "What can go wrong with dental website tracking",
        [
          "A standard Meta Pixel or Google tag can send the full page address of every page a visitor views — for example, a page about dental implants or gum disease treatment — together with identifiers that link the visit to a person. Some setups also capture form fields. For a healthcare provider, that can mean sharing health information with an advertising company.",
          "US regulators have issued guidance about tracking technologies on healthcare websites, and several healthcare organizations have faced complaints and lawsuits over pixels. Practices don’t need to panic, but they do need to know what their website sends.",
        ],
      ],
      [
        "How HIPAA-aware tracking works",
        [
          "We move tracking to a server-side setup that your practice controls. Before any event is sent to Google or Meta, we remove page paths, form contents and other details that could reveal a health condition or treatment. The ad platforms still learn that a lead or booking happened — enough to optimize your ads — but not who it was about or why.",
          "Where a platform offers it, we use privacy-focused options, and where a vendor will sign a business associate agreement (BAA), we can help you choose tools on that basis.",
        ],
      ],
      [
        "What we don’t claim",
        [
          "No marketing agency can make your practice “HIPAA compliant” on its own. Compliance depends on your policies, agreements and staff, and you should confirm decisions with your compliance advisor. What we do is set up advertising and tracking so they don’t create avoidable privacy risk — and document it clearly.",
          "Safe tracking is the foundation for our [Google Ads](/dental/google-ads-for-dentists) and [Facebook ads](/dental/facebook-ads-for-dentists) for dental practices.",
        ],
      ],
    ],
    faqs: [
      ["Is the Meta Pixel HIPAA compliant for dentists?", "A standard Meta Pixel can share health-related information from dental websites. It needs to be configured carefully, or replaced with filtered server-side tracking."],
      ["Can I still track Google Ads conversions safely?", "Yes. We track leads, calls and bookings as generic events without health details, using server-side filtering."],
      ["Will this make my practice HIPAA compliant?", "No agency can guarantee that on its own. We reduce privacy risk from ads and tracking and document the setup; your compliance advisor should confirm your overall program."],
      ["Do you need access to patient records?", "No. We don’t need access to patient records or your practice management system’s clinical data."],
      ["Does safe tracking hurt ad performance?", "Usually not much. Ad platforms mainly need to know that a lead or booking happened, which we still send."],
    ],
  },
  {
    slug: "invisalign-marketing",
    navLabel: "Invisalign & Aligner Marketing",
    metaTitle: "Invisalign Marketing for Dentists — Clear Aligner Ads",
    metaDescription:
      "Invisalign and clear aligner marketing for dental practices: Google and Instagram campaigns, smile-assessment offers and financing messages that book aligner consultations.",
    keywords: ["Invisalign marketing for dentists", "clear aligner marketing", "Invisalign ads", "orthodontic marketing", "clear aligner leads"],
    serviceType: "Clear aligner marketing for dental practices",
    eyebrow: "Invisalign & clear aligner marketing",
    h1: ["Invisalign and clear aligner marketing ", "that books consultations."],
    lead:
      "Aligner patients are often adults comparing your practice with direct-to-consumer brands. We run Google and Instagram campaigns that show why an in-office aligner treatment is worth it — and get them in for a smile assessment.",
    checks: [
      "Google, Instagram & Facebook campaigns",
      "Smile-assessment and financing offers",
      "Built to compete with mail-order aligners",
    ],
    formTitle: "Get a free aligner marketing plan",
    whyTitle: "How we market clear aligners",
    whyIntro:
      "Aligner treatment is a lifestyle decision for most adults. Ads need to show real results, a clear monthly cost and why a dentist-led treatment is safer than ordering online.",
    why: [
      ["Instagram-first creative", "Short videos and smile transformations made for Reels and Stories, where aligner buyers spend time."],
      ["Monthly cost messaging", "Ads lead with monthly payments and financing rather than a large total price."],
      ["Versus mail-order", "Messaging that explains supervision, scans and refinements — the reasons to choose a practice."],
      ["Google for comparers", "Search campaigns for aligner cost and provider searches in your area."],
      ["Smile-assessment offers", "Free or low-cost assessments with a digital scan to bring people in."],
      ["Booking tracked", "We track assessments booked and attended, not just leads."],
    ],
    includedTitle: "What’s included",
    included: [
      "Aligner offer and financing strategy",
      "Instagram and Facebook video and image ads",
      "Google Search campaigns for aligner keywords",
      "Landing page recommendations",
      "Lead forms and follow-up setup",
      "Booking and show-up tracking",
      "Monthly reporting",
    ],
    steps: [
      ["Plan", "We agree on the offer, budget and audience for your area."],
      ["Launch", "Instagram, Facebook and Google campaigns go live with tracking in place."],
      ["Optimize", "We refresh creatives monthly and optimize for booked assessments."],
    ],
    article: [
      [
        "Competing with direct-to-consumer aligners",
        [
          "Mail-order aligner brands spend heavily on advertising, so many adults compare your price with theirs. Your advantage is supervision: a dentist checks the plan, monitors progress and handles refinements. We put that advantage at the center of your ads, along with a clear monthly cost.",
        ],
      ],
      [
        "A note on the Invisalign name",
        [
          "Invisalign is a trademark of Align Technology. Practices can usually describe the treatment they offer by name, but should follow Align’s guidelines, avoid using its logo without permission and use “clear aligners” as well. We write ads and pages that follow these rules.",
        ],
      ],
      [
        "Which channels work best",
        [
          "Instagram and Facebook usually bring the most aligner leads, because the decision is visual and often not urgent. Google Search catches people already comparing providers. We often start with both and move budget to whichever brings more booked assessments. See also [Facebook ads for dentists](/dental/facebook-ads-for-dentists).",
        ],
      ],
    ],
    faqs: [
      ["Can I use the word Invisalign in my ads?", "Usually, if you offer the treatment and follow Align Technology’s guidelines. We also use “clear aligners” and avoid using their logo without permission."],
      ["Which works better for aligners: Google or Instagram?", "Instagram and Facebook often bring more leads; Google brings people closer to deciding. Most practices do best with both."],
      ["What budget do aligner campaigns need?", "Many practices start with $1,000–$3,000 a month in ad spend. We recommend a budget after the free plan."],
    ],
  },
  {
    slug: "emergency-dentist-ads",
    navLabel: "Emergency Dentist Ads",
    metaTitle: "Emergency Dentist Advertising — Same-Day Patients",
    metaDescription:
      "Emergency dentist advertising that brings same-day patients: Google call ads, Local Services Ads and after-hours scheduling, tracked from call to visit.",
    keywords: ["emergency dentist advertising", "emergency dentist ads", "emergency dental marketing", "same day dentist ads"],
    serviceType: "Emergency dentist advertising",
    eyebrow: "Emergency dentist ads",
    h1: ["Emergency dentist ads that ", "ring your phone today."],
    lead:
      "People with a toothache or broken tooth search Google and call the first practice that can see them. We put your practice at the top of those searches — only during the hours your team can answer.",
    checks: [
      "Call-focused Google Ads & Local Services Ads",
      "Ads scheduled to your open hours",
      "Every call tracked and reviewed",
    ],
    formTitle: "Get a free emergency ads audit",
    whyTitle: "Built for urgent searches",
    whyIntro:
      "Emergency patients decide in minutes. They need to see that you’re open, close and can see them today. Our emergency campaigns are designed around the phone call.",
    why: [
      ["Calls first", "Call-focused ads and call assets, so mobile searchers can ring you in one tap."],
      ["Open-hours scheduling", "Ads run when someone can answer. Unanswered calls are wasted money."],
      ["Close to the practice", "Tight radius targeting, because emergency patients rarely travel far."],
      ["Local Services Ads", "Pay-per-lead ads with the Google Screened badge above search results."],
      ["Call review", "We review call outcomes, so we know which ads bring real emergency visits."],
      ["Gateway to long-term patients", "Emergency visits often become regular patients — we track that too where possible."],
    ],
    includedTitle: "What’s included",
    included: [
      "Emergency keyword research and negatives",
      "Call-focused Search campaigns",
      "Local Services Ads setup",
      "Ad scheduling to your open hours",
      "Call tracking and call outcome review",
      "Landing page with same-day booking",
      "Monthly report on calls and emergency visits",
    ],
    steps: [
      ["Hours & capacity", "We learn when you can see emergency patients and how many."],
      ["Launch call campaigns", "Call ads and Local Services Ads go live during your open hours."],
      ["Review calls", "We review call outcomes and adjust keywords, hours and bids."],
    ],
    article: [
      [
        "Why emergency patients are worth chasing",
        [
          "Emergency visits fill gaps in the schedule and often lead to further treatment — crowns, root canals, implants — and many emergency patients stay with the practice that helped them. Because they search with urgent intent, Google Ads usually converts them faster than any other channel.",
        ],
      ],
      [
        "The details that make emergency ads work",
        [
          "The most important setting is the schedule: ads should only run when your team can answer and see the patient soon. We also keep the radius tight, use call assets and call-only ads on mobile, and send people to a simple page with your phone number at the top.",
          "We track every call and review outcomes with your team. Emergency campaigns pair well with our broader [Google Ads for dentists](/dental/google-ads-for-dentists) service.",
        ],
      ],
    ],
    faqs: [
      ["Should emergency ads run 24/7?", "Only if someone can answer and see patients. Otherwise we schedule ads to your open hours so you don’t pay for missed calls."],
      ["Are Local Services Ads good for emergency dentists?", "Often yes. They show above regular ads and you pay per lead rather than per click."],
      ["How do you know if a call became a visit?", "Call tracking records the call; your front desk confirms the outcome, or we match it with booking data where possible."],
    ],
  },
  {
    slug: "google-business-profile",
    navLabel: "Google Business Profile for Dentists",
    metaTitle: "Google Business Profile for Dentists — Rank in the Map",
    metaDescription:
      "Google Business Profile management for dentists: rank in the Google Map Pack for “dentist near me”, get more reviews, calls and direction requests.",
    keywords: ["Google Business Profile for dentists", "dentist near me ranking", "dental local SEO", "Google Maps dentist ranking", "dental Map Pack"],
    serviceType: "Google Business Profile management for dental practices",
    eyebrow: "Google Business Profile for dentists",
    h1: ["Get your practice into the ", "Google Map Pack."],
    lead:
      "When people search “dentist near me”, the three practices on the map get most of the calls. We optimize and manage your Google Business Profile so your practice is one of them.",
    checks: [
      "Profile setup, categories and services",
      "Weekly posts, photos and Q&A",
      "Review growth and replies",
    ],
    formTitle: "Get a free Google Business Profile audit",
    whyTitle: "How we grow dental practices on Google Maps",
    whyIntro:
      "Your Google Business Profile is often the first thing a new patient sees. Ranking in the Map Pack depends on relevance, distance and prominence — and the parts you control make a big difference.",
    why: [
      ["Complete, accurate profile", "Primary and secondary categories, services, hours, insurance info and appointment links set up correctly."],
      ["Reviews that keep coming", "A simple review request process for your front desk, plus replies to every review."],
      ["Fresh activity", "Weekly posts, offers and new photos of your team and office."],
      ["Consistent listings", "Your name, address and phone number matched across directories and your website."],
      ["Local landing pages", "Website pages that support your profile for each service and area."],
      ["Results you can see", "Calls, direction requests, website clicks and ranking across your service area."],
    ],
    includedTitle: "What’s included",
    included: [
      "Profile audit and full optimization",
      "Categories, services and attributes",
      "Weekly posts and photo uploads",
      "Review request process and review replies",
      "Directory listing cleanup",
      "Local ranking reports by area",
      "Monthly report on calls, directions and clicks",
    ],
    steps: [
      ["Audit", "We check your profile, reviews, competitors and local rankings."],
      ["Optimize", "We fix the profile, listings and website signals."],
      ["Grow", "Weekly posts, photos and a steady flow of new reviews."],
    ],
    article: [
      [
        "How the Google Map Pack works",
        [
          "Google ranks local results on three things: relevance (does your profile match the search?), distance (how close are you?) and prominence (how well known and well reviewed are you?). You can’t move your office, but you can make your profile more relevant and more prominent than nearby practices.",
          "For a single-dentist practice in Ontario, Canada, this work led to a Top 3 Map Pack ranking for “dentist near me” in core zip codes, 126% more calls from the profile and 64 new reviews.",
        ],
      ],
      [
        "Reviews: the biggest lever",
        [
          "Practices with more recent, detailed reviews tend to rank higher and win more calls. We give your front desk a simple way to ask happy patients for a review and we reply to every review in a friendly, privacy-safe way — never confirming that someone is a patient or discussing treatment.",
        ],
      ],
      [
        "Maps and ads together",
        [
          "Your profile wins the map; ads win the top of the page. Practices that run both usually get the most new-patient calls. See [Google Ads for dentists](/dental/google-ads-for-dentists).",
        ],
      ],
    ],
    faqs: [
      ["How long does it take to rank in the Map Pack?", "Many practices see better rankings within 2–3 months. Competitive cities take longer and depend heavily on reviews."],
      ["Can you get us more Google reviews?", "We set up a simple, policy-compliant process for asking patients for reviews. We never buy or fake reviews."],
      ["How should we reply to patient reviews?", "Thank the reviewer without confirming they are a patient or mentioning treatment. We write replies that follow this rule."],
    ],
  },
];
