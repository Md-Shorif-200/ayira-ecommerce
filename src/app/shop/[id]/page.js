import Script from "next/script";
import ProductDetails from "../../../../pages/Shop/ProductDetails";

export const metadata = {
  title: "Details",
  description:
    "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords:
    "Details, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery",
  alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};
export default async function page({ params }) {
  const { id } = await params;
  let allProduct = {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}find-single-products/${id}`,
      {
        revalidate: 0,
      }
    );
    if (res.ok) {
      const data = await res.json();
      allProduct = data;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: `${allProduct.title}`,
            url: `https://www.aaryansourcing.com/shop/${allProduct._id}`,
            logo: "https://www.aaryansourcing.com/logo.png",
            sameAs: [
              "https://www.facebook.com/aaryansourcing",
              "https://www.linkedin.com/company/aaryansourcing/?viewAsMember=true",
            ],
          }),
        }}
      />
      <ProductDetails myProductData={allProduct} id={id} />
    </>
  );
}
