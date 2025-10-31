import Wishlist from "../../../pages/Wishlist/Wishlist";

export const metadata = {
  title: "Wishlist",
  description:
    "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords:
    "Wishlist, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery",
  alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};

const page = async () => {
  return (
    <>
      <Wishlist />
    </>
  );
};

export default page;
