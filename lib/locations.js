// Markets we target for "white label advertising agency" searches. Shown on /white-label#<id>
// (no separate pages), linked from the home page and footer, and listed in structured data.
export const LOCATIONS = [
  {
    id: "canada",
    name: "Canada",
    schemaType: "Country",
    heading: "White label advertising agency for Canadian agencies",
    intro:
      "Hiring a senior media buyer in Toronto or Vancouver is expensive. Canadian agencies use Mind and Matrix Co. as their white label advertising team instead: we run Google Ads, Facebook and Instagram ads and Microsoft Ads for your clients, with budgets and reports in Canadian dollars and your logo on every report.",
    points: [
      "Overnight turnaround: Dhaka is 10–11 hours ahead of Toronto, so end-of-day requests are done by morning",
      "City and province targeting for Toronto, Vancouver, Calgary, Montreal and Ottawa",
      "Consent-aware lead forms and tracking for Canadian privacy rules",
    ],
  },
  {
    id: "australia",
    name: "Australia",
    schemaType: "Country",
    heading: "White label advertising agency for Australian agencies",
    intro:
      "Australian agencies need a white label partner that is online when they are. Our team works only a few hours behind Sydney and Melbourne, so we share most of your business day — message us at lunch and get changes the same afternoon. Budgets and reports are in Australian dollars, under your brand.",
    points: [
      "Live calls and same-day changes during Australian business hours",
      "Targeting for Sydney, Melbourne, Brisbane, Perth, Adelaide and regional areas",
      "Lead generation for healthcare, home services, childcare and local businesses",
    ],
  },
  {
    id: "california",
    name: "California",
    schemaType: "State",
    heading: "White label advertising agency for California agencies",
    intro:
      "California has some of the most expensive clicks in the US, so every wasted dollar costs your client. We help California agencies run tightly controlled, well-tracked Google, Meta and Microsoft campaigns under their own brand — from Los Angeles to the Bay Area.",
    points: [
      "Built for high CPCs: tight keyword control, negative lists and bid strategies that protect budget",
      "Overnight optimization while your team is offline (Dhaka is 13–14 hours ahead of Los Angeles)",
      "Privacy-aware server-side tracking and consent setups for CCPA/CPRA",
      "Targeting for Los Angeles, San Francisco Bay Area, San Diego, Sacramento and Orange County",
    ],
  },
  {
    id: "new-york",
    name: "New York",
    schemaType: "State",
    heading: "White label advertising agency for New York agencies",
    intro:
      "New York is one of the most competitive ad markets in the world, and senior media buyers there are hard to hire and expensive to keep. Mind and Matrix Co. works as your white label advertising team: we plan, launch and manage Google, Meta and Microsoft campaigns for your clients, and you keep the client relationship and the margin.",
    points: [
      "Overnight turnaround: Dhaka is 10–11 hours ahead of New York, so end-of-day requests are done by morning",
      "Targeting for Manhattan, Brooklyn, Queens, Long Island, Westchester, Buffalo and Rochester",
      "Lead generation for legal, healthcare, dental, real estate and professional services",
      "Call tracking and lead tracking so your clients see real results",
    ],
  },
  {
    id: "florida",
    name: "Florida",
    schemaType: "State",
    heading: "White label advertising agency for Florida agencies",
    intro:
      "Florida clients often have seasonal demand — tourism, home services and healthcare all rise and fall through the year. We help Florida agencies shift budgets quickly, so clients spend more when demand is high and less when it is low, with every report in your brand.",
    points: [
      "Seasonal budget plans around snowbird season, hurricane season and holidays",
      "Targeting for Miami, Fort Lauderdale, Tampa, Orlando and Jacksonville",
      "Lead generation for home care, healthcare and local service businesses",
    ],
  },
];

export const LOCATION_NAMES = LOCATIONS.map((l) => l.name);
// "Canada, Australia, California, New York and Florida"
export const LOCATION_LIST = `${LOCATION_NAMES.slice(0, -1).join(", ")} and ${LOCATION_NAMES.at(-1)}`;
