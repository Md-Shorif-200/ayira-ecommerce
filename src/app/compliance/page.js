import Script from "next/script";
import Compliance from "../../../pages/Compliance/Compliance";

export const metadata = {
  title: "Compliance",
  description:
    "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords:
    "Compliance, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery",
  alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};

const page = () => {
  return (
    <>
      <Script
        id="compliance-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Compliance",
            url: "https://aaryansourcing.com/compliance",
              alternateName: "Aaryan",
            description:
              "Learn about Aaryan Sourcing's commitment to ethical practices, industry standards, and compliance with international regulations. We uphold transparency, integrity, and accountability in all aspects of our manufacturing processes.",
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
                "Aaryan Sourcing is committed to compliance with global standards, ensuring all manufacturing processes meet the highest ethical, environmental, and legal guidelines.",
              product: {
                "@type": "Product",
                name: "Apparel Manufacturing Services",
                category: "Apparel & Fashion",
                description:
                  "Comprehensive apparel manufacturing services including sourcing, production, and distribution for fashion businesses.",
              },
              compliance: {
                "@type": "GovernmentService",
                name: "Ethical Sourcing and Compliance",
                url: "https://aaryansourcing.com/compliance",
                serviceType:
                  "Ethical Sourcing, Sustainability, Fair Labor Practices",
                areaServed: "Global",
                provider: {
                  "@type": "Organization",
                  name: "Aaryan Sourcing",
                  url: "https://aaryansourcing.com",
                },
              },
            },
          }),
        }}
      />
      <Compliance />
    </>
  );
};

export default page;
