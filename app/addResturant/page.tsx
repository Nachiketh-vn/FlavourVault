"use client";
import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useMemo } from "react";

function Page() {
  const { data: session } = useSession();
  const ses=()=>{console.log(session?.user);
  }
  return (
    <div>
      <Navbar />
      <div className="text-white">
        <button onClick={ses}>
          click
        </button>
        <h1> Welcome {" " + session?.user}</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
