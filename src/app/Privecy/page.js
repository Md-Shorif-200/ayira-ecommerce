import Script from "next/script";
import Privacy from "../../../pages/PrivecyPolicy/Privacy";

export const metadata = {
  title: "Privacy & Policy",
  description:
    "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords:
    "Privacy & Policy, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery",
  alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};

const page = () => {
  return (
    <>
      <Script
        id="privacy-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy & Policy",
            url: "https://aaryansourcing.com/Privecy",
              alternateName: "Aaryan",
            description:
              "Read Aaryan Sourcing’s Privacy & Policy, which outlines how we collect, use, and protect your personal information. Our policy ensures transparency and compliance with privacy regulations to safeguard your data.",
            mainEntity: {
              "@type": "Organization",
              name: "Aaryan Sourcing",
              url: "https://aaryansourcing.com",
              logo: "https://aaryansourcing.com/images/logo.png",
              sameAs: [
                "https://www.facebook.com/aaryansourcing",
                "https://www.linkedin.com/company/aaryansourcing",
                "https://twitter.com/aaryansourcing",
                "https://www.instagram.com/aaryansourcing",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "House #19, Road #07, Flat #5-A, Sector #10, Uttara Model Town",
                addressLocality: "Dhaka",
                postalCode: "1230",
                addressCountry: "BD",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+8801713117849",
                contactType: "Customer Service",
                areaServed: "BD",
                availableLanguage: "English",
              },
              description:
                "Aaryan Sourcing is a leading apparel manufacturing company offering global sourcing, production, and distribution services. Our Privacy & Policy page ensures that your personal data is handled with care and in compliance with applicable regulations.",
              product: {
                "@type": "Product",
                name: "Apparel Manufacturing Services",
                category: "Apparel & Fashion",
                description:
                  "Comprehensive apparel manufacturing services including sourcing, production, and distribution for fashion businesses.",
              },
              policy: {
                "@type": "CreativeWork",
                name: "Privacy & Policy",
                url: "https://aaryansourcing.com/Privecy",
                description:
                  "Aaryan Sourcing’s Privacy & Policy outlines how we protect your privacy and handle your personal information in compliance with relevant data protection regulations.",
              },
            },
          }),
        }}
      />
      <Privacy></Privacy>
    </>
  );
};

export default page;
