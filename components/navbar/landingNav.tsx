import React from "react";
import { Disclosure } from "@headlessui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BuyMeACoffeeButton from "../buyMeACofeeButton";

export default function LandingNavbar() {
  return (
    <div className="top-0  sticky z-50  ">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex md:flex-1 sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="/logo.png"
                  alt="Your Company"
                />
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="hidden md:block"></div>

            <a
              href="http://partner.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <label className="cursor-pointer h-[32px] border ml-3 border-gray-800 shadow-xl text-[12px] px-2 rounded-md flex items-center justify-center text-black bg-white font-medium md:mt-0">
                Check out Partner.io <ArrowRight className="ml-1" size={16} />
              </label>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
