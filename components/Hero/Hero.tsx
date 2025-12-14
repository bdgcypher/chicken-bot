import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


export default function Hero() {

  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-yellow-100/20 pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-yellow-600/10 ring-1 ring-yellow-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              We're changing the way you chase chickens.
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                Have you ever chased a pixelated chicken before, but found it
                was just too easy? Well not anymore! Our Chickens are part
                robot and learn your chasing patterns with time in order to
                ensure that you have to stretch yourself to the limits each time
                you play in order to Bag the Bird!
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                >
                  Play Now
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Behind the Scenes <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            {/* <img
              src="/chicken_head.png"
              alt="Pixelated chicken head image"
              className="mt-10 aspect-[6/5] w-full max-w-md rounded-2xl object-cover text-8xl sm:mt-16 lg:mt-0 lg:max-w-lg xl:row-span-2 xl:row-end-2 xl:mt-36"
            /> */}
            <img
              src="/chicken_head.jpg"
              alt="Pixelated chicken head image"
              className="mt-10 aspect-[6/5] w-full max-w-md rounded-2xl border-8 border-gray-900 shadow-2xl object-cover text-8xl sm:mt-16 lg:mt-0 lg:max-w-lg xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}
