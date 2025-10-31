import Script from "next/script";
import Shop from "../../../pages/Shop/Shop";

export const metadata = {
  title: "Collections",
  description:
    "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords:
    "Collections, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery",
  alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};

async function getProducts(searchParams) {
  const query = new URLSearchParams(Object.entries(searchParams)).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/find-filterd-products?${query}`,
    {
      next: { revalidate: 1 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();

  return Array.isArray(data.data) ? data.data : [];
}

export default async function page({ searchParams }) {
  const products = await getProducts(searchParams);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": products.map((product) => ({
      "@type": "Product",
      name: product.name || product.title || "",
      description: product.description || "",
    })),
  };
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Aaryan Sourcing",
            url: "https://www.aaryansourcing.com/shop",
            logo: "https://www.aaryansourcing.com/logo.png",
              alternateName: "Aaryan",
            sameAs: [
              "https://www.facebook.com/aaryansourcing",
              "https://www.linkedin.com/company/aaryansourcing/?viewAsMember=true",
            ],
          }),
        }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <Shop products={products} />
    </>
  );
}
