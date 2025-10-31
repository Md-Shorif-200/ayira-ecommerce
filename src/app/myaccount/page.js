import { Suspense } from "react";
import MyAccount from "../../../pages/MyAccount/MyAccount";
import LoadingSpinner from "../../../components/LoadingSpinner";

export const metadata = {
  title: "My Account",
  description:
    "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords:
    "My Account, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery",
  alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};

const page = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <MyAccount />
      </Suspense>
    </>
  );
};

export default page;
