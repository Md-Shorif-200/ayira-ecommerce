import OrderNow from "../../../pages/AdminDashboard/OrderPage/OrderNow";
import OrderPage from "../../../pages/Shop/Order/OrderPage";

export const metadata = {
  title: "Order",
  description:
    "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords:
    "Order, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery",
  alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};

const page = () => {
  return (
    <>
      <OrderPage></OrderPage>
    </>
  );
};

export default page;
