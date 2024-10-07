import SignIn from "@/components/loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div>
        <SignIn />
    </div>
  )
}

export default page