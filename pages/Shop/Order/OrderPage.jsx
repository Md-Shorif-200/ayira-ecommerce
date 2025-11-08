"use client";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import {
  BsTag,
  BsPerson,
  BsBuilding,
  BsEnvelope,
  BsTelephone,
  BsGlobe,
  BsGeoAlt,
  BsCalendar,
  BsChatDots,
  BsSend,
} from "react-icons/bs";
import { GiTShirt } from "react-icons/gi";
import useAuth from "../../../Hooks/useAuth";

const OrderPage = () => {
  const recaptchaRef = useRef(null);
  const { user } = useAuth();
  const ADMIN_EMAIL = "noorjahanmeem220@gmail.com";

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      styleNumber: "AASLTD-MST-04",
    },
  });

  const onSubmit = async (data) => {
    if (!user) return toast.error("Please log in to place an order.");

    const captchaToken = recaptchaRef.current.getValue();
    if (!captchaToken) return toast.error("Please complete the CAPTCHA verification.");

    const orderData = {
      styleNumber: data.styleNumber,
      name: data.name,
      company: data.companyName,
      email: user.email,
      phone: data.phoneNumber,
      website: data.webURL,
      address: data.mailingAddress,
      deliveryTime: data.date,
      message: data.message,
      orderBy: user.uid,
      captchaToken: captchaToken,
    };

    try {
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!orderRes.ok) {
        const contentType = orderRes.headers.get("content-type");
        let errorMessage = `Server responded with status: ${orderRes.status}`;
        if (contentType && contentType.includes("application/json")) {
          const errorResult = await orderRes.json();
          errorMessage = errorResult.message || errorMessage;
          if (errorMessage.toLowerCase().includes("captcha"))
            recaptchaRef.current.reset();
        }
        return toast.error(errorMessage);
      }

      toast.success("Order submitted successfully!");

      // Send email notification
      try {
        const emailPayload = {
          userName: orderData.name,
          userEmail: orderData.email,
          adminEmail: ADMIN_EMAIL,
          orderInfo: {
            styleNumber: orderData.styleNumber,
            company: orderData.company,
          },
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/send-order-emails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        toast.error("Order submitted, but email notification failed.");
      }

      reset();
      recaptchaRef.current.reset();
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-6xl w-full p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-md">
        <header className="mb-8 text-center">
          <h1 className="flex items-center justify-center text-2xl font-bold text-gray-800 md:text-3xl">
            <GiTShirt className="mr-3 text-3xl text-indigo-500 md:text-4xl" />
            Place Your Order
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Fill out the form below to submit your order.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Style Number */}
          <div>
            <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
              <BsTag className="text-blue-500" />
              <span className="ml-2">Style Number</span>
            </label>
            <input
              type="text"
              {...register("styleNumber")}
              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
                <BsPerson className="text-purple-500" />
                <span className="ml-2">Your Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                defaultValue={user?.displayName || ""}
                type="text"
                className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
                <BsBuilding className="text-green-500" />
                <span className="ml-2">Company Name</span>
              </label>
              <input
                {...register("companyName")}
                type="text"
                className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
                <BsEnvelope className="text-red-500" />
                <span className="ml-2">Email Address</span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                disabled
                className="w-full px-3 py-2 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
                <BsTelephone className="text-yellow-500" />
                <span className="ml-2">Phone Number</span>
              </label>
              <input
                {...register("phoneNumber", { required: true })}
                type="tel"
                className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
                <BsGlobe className="text-blue-500" />
                <span className="ml-2">Website URL</span>
              </label>
              <input
                {...register("webURL")}
                type="text"
                placeholder="https://yourcompany.com"
                className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
                <BsGeoAlt className="text-pink-500" />
                <span className="ml-2">Mailing Address</span>
              </label>
              <input
                {...register("mailingAddress")}
                type="text"
                placeholder="Your address here..."
                className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Delivery Date */}
          <div>
            <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
              <BsCalendar className="text-purple-500" />
              <span className="ml-2">Expected Delivery Date</span>
            </label>
            <input
              {...register("date", { required: true })}
              type="date"
              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="flex items-center mb-1.5 text-sm text-gray-600 font-medium">
              <BsChatDots className="text-red-400" />
              <span className="ml-2">Additional Message</span>
            </label>
            <textarea
              {...register("message")}
              rows="4"
              placeholder="Enter any special instructions or comments here..."
              className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>

          {/* ReCAPTCHA */}
          <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-100 rounded-lg">
            <h3 className="flex items-center justify-center mb-4 text-sm font-semibold text-gray-700">
              <span className="mr-2">🤖</span> CAPTCHA Verification
            </h3>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={!user || isSubmitting}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BsSend className="w-5 h-5 mr-2" />
              {isSubmitting ? "Placing Order..." : "Place Order Now"}
            </button>
            {!user && (
              <p className="mt-4 text-sm text-red-500">
                You must be logged in to place an order.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
