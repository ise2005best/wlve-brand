import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "../utils/site";

export const metadata: Metadata = {
  title: "Terms & Policies",
  description: `Terms of sale, terms of service, privacy, returns and cookie policies for ${SITE_NAME}.`,
  alternates: { canonical: "/terms-of-service" },
};

const LAST_UPDATED = "1st of November 2026";
const CONTACT_EMAIL = "adunni.sun@gmail.com";

type Block = {
  heading: string;
  body?: string;
  items?: string[];
  after?: string;
};

type Section = {
  id: string;
  title: string;
  navLabel: string;
  blocks: Block[];
};

const SECTIONS: Section[] = [
  {
    id: "terms-of-sale",
    title: "Terms of Sale",
    navLabel: "Terms of Sale",
    blocks: [
      {
        heading: "1. Company Information",
        body: `The Website www.wlveee.com is operated by ${SITE_NAME}. References to "we", "our", and "us" refer to ${SITE_NAME}.`,
      },
      {
        heading: "2. Order Acceptance",
        body: `Orders placed through the Website are subject to acceptance by ${SITE_NAME}. A contract is formed only when we send confirmation that your order has been accepted. We reserve the right to cancel orders prior to dispatch, in which case you will receive a full refund.`,
      },
      {
        heading: "3. Pricing",
        body: `Prices are displayed in the currency of the shipping country you select (for example GBP (£) or NGN (₦)). ${SITE_NAME} reserves the right to adjust prices at any time before purchase. If a pricing error occurs we may cancel affected orders and issue a full refund.`,
      },
      {
        heading: "4. Payment",
        body: `Payment is taken at the time of checkout through our secure checkout provider, Shopify. Ownership of products transfers once payment has been received in full. Orders suspected of fraudulent activity may be cancelled.`,
      },
      {
        heading: "5. Product Availability",
        body: `Products are released in drops and may be produced in limited quantities. ${SITE_NAME} reserves the right to discontinue or withdraw products at any time.`,
      },
      {
        heading: "6. Import Duties",
        body: `Customers ordering from outside the UK may be required to pay import duties, customs fees or taxes. These charges are the responsibility of the customer.`,
      },
      {
        heading: "7. Delivery",
        body: `Delivery timelines are estimates and may vary due to courier services or customs procedures. ${SITE_NAME} is not responsible for delays outside our control.`,
      },
      {
        heading: "8. Limitation of Liability",
        body: `To the fullest extent permitted by law, ${SITE_NAME} shall not be liable for indirect losses including loss of profits or business opportunities, and our liability shall not exceed the purchase price of the product. Nothing in these Terms limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot be limited by law, and nothing affects your statutory rights as a consumer.`,
      },
      {
        heading: "9. Governing Law",
        body: `These Terms are governed by the laws of England and Wales.`,
      },
    ],
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    navLabel: "Terms of Service",
    blocks: [
      {
        heading: "Acceptable Use",
        body: "Users may not:",
        items: [
          "Use automated purchasing tools or bots",
          "Scrape or reproduce Website content",
          "Attempt to disrupt Website functionality",
          "Submit false information",
        ],
        after: "Violation may result in restriction or termination of access.",
      },
      {
        heading: "Intellectual Property",
        body: `All content displayed on the Website including product designs, images, graphics, text, and logos are the exclusive property of ${SITE_NAME}. These materials are protected by copyright and trademark laws. No content may be reproduced or distributed without written permission.`,
      },
      {
        heading: "Website Availability",
        body: `${SITE_NAME} does not guarantee uninterrupted access to the Website. We reserve the right to modify or suspend Website functionality at any time.`,
      },
      {
        heading: "Liability",
        body: `Use of the Website is at your own risk. To the extent permitted by law, ${SITE_NAME} shall not be liable for damages arising from Website use.`,
      },
    ],
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    navLabel: "Privacy Policy",
    blocks: [
      {
        heading: "Who We Are",
        body: `${SITE_NAME} is the controller of the personal data collected through the Website. You can contact us about anything in this policy at ${CONTACT_EMAIL}.`,
      },
      {
        heading: "Information We Collect",
        items: [
          "Name, email address and phone number",
          "Billing and shipping address",
          "Payment information (processed by our payment providers, we never see or store your full card details)",
          "Email address and phone number when you sign up for early access to drops",
          "Your approximate location (country), worked out from your IP address",
          "Browsing behaviour, such as pages visited and the device and browser you use",
        ],
      },
      {
        heading: "How We Use Data",
        body: "Personal data may be used to:",
        items: [
          "Process and deliver orders",
          "Show prices, currency and shipping options for your country",
          "Provide customer support",
          "Send you drop announcements and updates you have signed up for",
          "Detect fraud and bot activity",
          "Improve Website functionality",
          "Comply with legal obligations",
        ],
      },
      {
        heading: "Legal Basis for Processing",
        body: "Data is processed on the basis of:",
        items: [
          "Contractual necessity (to fulfil your order)",
          "Legitimate business interests (such as fraud prevention and improving the Website)",
          "Legal compliance",
          "Your consent (for marketing emails and messages)",
        ],
      },
      {
        heading: "Who We Share Data With",
        body: "We only share personal data with service providers who help us run the store:",
        items: [
          "Shopify, which powers our store, checkout and payments",
          "Vercel, which hosts the Website and provides anonymous analytics",
          "Supabase, which stores our early access sign-up list",
          "Resend, which sends our emails",
        ],
        after:
          "We never sell your personal data. Some of these providers may process data outside the UK. Where they do, appropriate safeguards are in place as required by data protection law.",
      },
      {
        heading: "Marketing",
        body: `We will only send you marketing emails or messages if you have signed up to receive them. You can unsubscribe at any time by using the link in our emails or by contacting ${CONTACT_EMAIL}.`,
      },
      {
        heading: "Data Security",
        body: `${SITE_NAME} uses secure systems and trusted payment processors to protect personal information.`,
      },
      {
        heading: "Customer Rights",
        body: "Under UK GDPR you have the right to:",
        items: [
          "Access your personal data",
          "Request corrections",
          "Request deletion",
          "Object to or restrict how we use your data",
          "Receive a copy of your data in a portable format",
          "Withdraw consent at any time",
        ],
        after: `Requests may be submitted to ${CONTACT_EMAIL}. If you are unhappy with how we handle your data, you can complain to the Information Commissioner's Office (ico.org.uk).`,
      },
      {
        heading: "Data Retention",
        body: "Personal data will be retained only for as long as necessary for legal and operational purposes. Order records are kept for as long as required for tax and accounting purposes.",
      },
    ],
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    navLabel: "Refund Policy",
    blocks: [
      {
        heading: "Return Window",
        body: "Returns must be requested within 14 days of delivery.",
      },
      {
        heading: "Hygiene Rules",
        body: "For hygiene reasons, swimwear can only be returned if:",
        items: [
          "It was tried on over underwear only",
          "The hygiene liner or sticker is still in place and undamaged",
          "It is unworn, unwashed and free from marks, including makeup, fake tan, sunscreen, deodorant and perfume",
        ],
        after:
          "Swimwear that does not meet these rules cannot be refunded and will be sent back to you.",
      },
      {
        heading: "Return Conditions",
        body: "Items must be returned:",
        items: [
          "Unworn",
          "Unused",
          "In original packaging",
          "With tags attached",
        ],
      },
      {
        heading: "Non-Returnable Items",
        body: "The following items are not eligible for return:",
        items: [
          "Swimwear with a removed or damaged hygiene liner",
          "Customised items",
          "Final sale products",
          "Gift cards",
        ],
      },
      {
        heading: "Faulty Items",
        body: `If your item arrives faulty or you received the wrong item, contact ${CONTACT_EMAIL} and we will arrange a replacement or full refund. The hygiene rules above do not prevent you from returning a faulty item.`,
      },
      {
        heading: "Refund Processing",
        body: "Refunds will be processed within 14 days after returned items are received and inspected. Refunds will be issued to the original payment method.",
      },
      {
        heading: "Return Shipping",
        body: "Return shipping costs are the responsibility of the customer unless the product is faulty.",
      },
    ],
  },
  {
    id: "anti-bot-policy",
    title: "Anti-Bot & Product Drop Policy",
    navLabel: "Anti-Bot Policy",
    blocks: [
      {
        heading: "Fair Purchase Policy",
        body: "To ensure fair access to products:",
        items: [
          "Automated purchasing systems are prohibited",
          "Bots and scripts are prohibited",
          "Purchase limits may apply",
        ],
      },
      {
        heading: "Order Cancellation",
        body: `${SITE_NAME} reserves the right to cancel orders suspected of:`,
        items: [
          "Bot usage",
          "Automated purchasing",
          "Fraudulent activity",
          "Bulk purchases intended for resale",
        ],
      },
      {
        heading: "Resale Restrictions",
        body: `Products purchased from www.wlveee.com are intended for personal use only. ${SITE_NAME} reserves the right to cancel orders suspected of being placed for commercial resale.`,
      },
      {
        heading: "Enforcement",
        body: "Violations of this policy may result in:",
        items: [
          "Order cancellation",
          "Refund issuance",
          "Restriction from future purchases",
        ],
      },
    ],
  },
  {
    id: "cookie-policy",
    title: "Cookie Policy",
    navLabel: "Cookie Policy",
    blocks: [
      {
        heading: "What Are Cookies",
        body: "Cookies are small text files placed on your device when you visit a website. They allow websites to recognise your device and store certain information about your preferences or actions. Cookies may be session-based (deleted after you close your browser) or persistent (stored for a longer period).",
      },
      {
        heading: "Cookies and Storage We Use",
        body: "We keep cookies to a minimum:",
        items: [
          "A country cookie that remembers your shipping country so we can show the right prices and currency. It lasts for one year.",
          "Browser session storage that holds your cart. It is cleared when you close the tab.",
        ],
        after:
          "Both are essential to how the store works, so they do not require consent.",
      },
      {
        heading: "Analytics",
        body: "We use Vercel Analytics to understand how visitors use the Website, such as which pages are visited. It does not use cookies and does not identify you personally.",
      },
      {
        heading: "Checkout",
        body: "Our checkout is provided by Shopify, which sets its own cookies needed to complete your purchase and prevent fraud. You can read more in Shopify's privacy policy.",
      },
      {
        heading: "Managing Cookies",
        body: "Most web browsers allow users to control cookies through browser settings. You may choose to block cookies, delete stored cookies, or receive alerts when cookies are used. Please note that disabling cookies may affect the functionality of the Website.",
      },
    ],
  },
  {
    id: "ip-brand-protection",
    title: "Intellectual Property & Brand Protection",
    navLabel: "IP & Brand Protection",
    blocks: [
      {
        heading: "Ownership of Intellectual Property",
        body: `All intellectual property displayed on the Website is the exclusive property of ${SITE_NAME}, including:`,
        items: [
          "Trademarks",
          "Logos",
          "Brand names",
          "Product designs",
          "Graphics and artwork",
          "Product photography",
          "Marketing materials",
          "Website design and layout",
          "Written content",
        ],
        after:
          "These materials are protected by applicable copyright, trademark, and intellectual property laws.",
      },
      {
        heading: "Prohibited Use",
        body: "Without prior written permission, the following actions are strictly prohibited:",
        items: [
          `Reproducing or copying ${SITE_NAME} designs`,
          `Manufacturing products that imitate ${SITE_NAME} products`,
          `Using ${SITE_NAME} trademarks or logos`,
          `Using ${SITE_NAME} product imagery for commercial purposes`,
          "Distributing or modifying any brand assets",
          `Creating derivative works based on ${SITE_NAME} designs`,
        ],
        after: `Unauthorised use of ${SITE_NAME} intellectual property may result in legal action.`,
      },
      {
        heading: "Counterfeit Products",
        body: `${SITE_NAME} actively monitors the market for counterfeit products. Any manufacture, distribution, or sale of counterfeit ${SITE_NAME} products is strictly prohibited.`,
      },
      {
        heading: "Reporting Infringement",
        body: `If you believe that intellectual property belonging to ${SITE_NAME} is being used without authorisation, please contact ${CONTACT_EMAIL} with details of the alleged infringement, the location of the infringing content, and supporting evidence.`,
      },
    ],
  },
];

const TermsPage = () => {
  return (
    <div className="bg-[#F7F2F2] text-black px-4 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="mb-10 md:mb-16 max-w-3xl">
        <p className="font-secondary-regular text-sm md:text-base uppercase text-black/50">
          Legal
        </p>
        <h1 className="font-secondary text-4xl md:text-6xl uppercase leading-none mt-2">
          Terms & Policies
        </h1>
        <p className="font-secondary-regular text-base md:text-lg text-black/70 mt-4">
          Please read these policies carefully before using our Website or
          placing an order.
        </p>
        <p className="font-secondary-light text-sm md:text-base text-black/50 mt-2">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <nav aria-label="Jump to section" className="lg:w-60 shrink-0">
          <div className="lg:sticky lg:top-32">
            <p className="font-secondary-regular text-xs md:text-sm uppercase text-black/50 mb-3">
              Jump to
            </p>
            <ul className="flex flex-row flex-wrap lg:flex-col gap-x-4 gap-y-2 lg:gap-3">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="font-secondary-regular text-sm md:text-base uppercase underline lg:no-underline lg:hover:underline"
                  >
                    {section.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex-1 min-w-0 max-w-3xl">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 md:scroll-mt-32 border-t border-black/20 pt-8 md:pt-10 pb-6 md:pb-8"
            >
              <h2 className="font-secondary text-2xl md:text-4xl uppercase leading-none mb-6 md:mb-8">
                {section.title}
              </h2>
              <div className="flex flex-col gap-6 md:gap-8">
                {section.blocks.map((block) => (
                  <div key={block.heading}>
                    <h3 className="font-secondary text-base md:text-xl uppercase mb-2">
                      {block.heading}
                    </h3>
                    {block.body && (
                      <p className="font-tertiary text-sm md:text-base text-black/70 leading-relaxed">
                        {block.body}
                      </p>
                    )}
                    {block.items && (
                      <ul className="list-disc pl-5 mt-2 flex flex-col gap-1 font-tertiary text-sm md:text-base text-black/70 leading-relaxed">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {block.after && (
                      <p className="font-tertiary text-sm md:text-base text-black/70 leading-relaxed mt-2">
                        {block.after}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="border-t border-black/20 pt-8 flex flex-row flex-wrap gap-x-6 gap-y-3 justify-between items-center">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-secondary-regular text-sm md:text-base underline"
            >
              {CONTACT_EMAIL}
            </a>
            <Link
              href="/"
              className="font-secondary-regular text-sm md:text-base uppercase underline"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
