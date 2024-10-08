"use client";
import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { IoMdAdd } from "react-icons/io";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  const Uemail = session?.user?.email;
  return (
    <div>
      <Navbar />
      <BackgroundBeams />
      <div className="text-white flex justify-center py-4">
        <h1 className="text-2xl">
          Welcome{" "}
          <span className="text-emerald-600 font-semibold">
            {" " + session?.user?.name}
          </span>
        </h1>
      </div>
      <div className="mx-[4rem]">
        <h2 className="text-xl text-white">Manage Your Restaurants</h2>
        {/* Adjusted this container */}
        <Link href={"/newRestaurant"}>
          <div className="flex flex-col px-6 items-start space-y-2 mt-4">
            <div className="flex flex-col items-center">
              <div className="h-20 hover:scale-105 transition ease-in w-20 rounded-lg border-[1.5px] border-white bg-neutral-900 flex justify-center items-center">
                <IoMdAdd className="text-gray-300 text-5xl" />
              </div>
              <p className="text-md font-semibold w-40 text-center text-gray-100 mt-2">
                Add Restaurant
              </p>
            </div>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
