import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Mind and Matrix Co. | White Label Paid Media Agency",
    template: "%s | Mind and Matrix Co.",
  },
  description:
    "White-label Google Ads, Meta Ads, Google Business Profile and YouTube management for marketing agencies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide scroll-reveal content only when JavaScript is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="page">{children}</body>
    </html>
  );
}
