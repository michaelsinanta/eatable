"use client";
import { useState } from "react";
import Head from "next/head";
import { IoLocationSharp } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

export default function OrderSummary() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Head>
        <title>Order Summary</title>
        <meta name="description" content="Order summary and payment details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex-grow bg-white">
        <AddressSection />
        <OrderSummarySection />
        <PaymentDetailsSection />
        <TotalSection />
      </main>
      <PlaceOrderButton />
    </div>
  );
}

const Header = () => (
  <header className="bg-white shadow-sm py-4 mb-4">
    <div className="flex items-center px-4">
      <Link href={"/merchant"}>
        <button className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </Link>

      <h1 className="text-lg font-semibold">Warung Aman - SCBD, Jakarta</h1>
    </div>
  </header>
);

const AddressSection = () => (
  <section className="bg-white p-4 border-b-2 mb-4">
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center mb-2">
        <IoLocationSharp className="mr-3 mb-2" size={45} color="red" />
        <div>
          <h2 className="text-lg font-semibold">Alamat Rumah</h2>
          <p className="text-sm text-white0 my-2">Di depan Indomaret</p>
        </div>
      </div>
      <IoIosArrowForward size={20} className="mb-10 mr-12" />
    </div>

    <div className="flex ml-14 w-3/4 items-center bg-gray-100 rounded-lg px-3 py-1 justify-between">
      <div className="text-sm text-gray-700 py-3">Jalan Lokasi No. 1</div>
      <button className="text-blue-500 text-sm font-semibold">Edit</button>
    </div>
    <p className="text-sm text-white0 mt-6 mb- ml-4 text-gray-600">
      Distance from you: 4.5 km
    </p>
  </section>
);

const OrderSummarySection = () => (
  <section className="bg-white px-8 border-b-2 pb-5">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-lg font-semibold">Order summary</h2>
      <button className="text-blue-500 text-sm font-semibold">Add items</button>
    </div>
    <div className="flex items-center mb-2">
      <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-md mr-2">
        <span className="text-sm font-semibold">1x</span>
      </div>
      <div className="flex-1 ml-2">
        <p className="text-sm font-semibold">Ayam penyet cabe ijo</p>
        <button className="text-blue-500 text-xs">Edit</button>
      </div>
      <p className="text-sm font-semibold">24.500</p>
    </div>
    <div className="border-t border-gray-200 pt-2">
      <div className="flex justify-between text-sm mb-2 text-gray-700">
        <span>Subtotal (Incl. Tax)</span>
        <span>24.500</span>
      </div>
      <div className="flex justify-between text-sm mb-2 text-gray-700">
        <span>Delivery fee</span>
        <span>5.000</span>
      </div>
      <div className="flex justify-between text-sm text-gray-700">
        <span>Order fee</span>
        <span>2.000</span>
      </div>
    </div>
  </section>
);

const PaymentDetailsSection = () => (
  <section className="bg-white pt-4 pb-2 px-8 border-b-2 mb-3">
    <h2 className="text-lg font-semibold mb-2">Payment details</h2>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <IoWallet size={25} className="mr-2" />
        <span className="text-lg">Rp300.000</span>
      </div>
      <IoIosArrowForward size={25} className="mb-8" />
    </div>
  </section>
);

const TotalSection = () => (
  <div className="bg-white px-8 mb-4">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold">Total</h2>
      <span className="text-xl font-bold">Rp31.500</span>
    </div>
  </div>
);

const PlaceOrderButton = () => (
  <div className="w-full px-4 mb-8">
    <button className="w-full py-3 bg-[#00AE4F] text-white rounded-lg font-semibold text-lg">
      Place Order
    </button>
  </div>
);
