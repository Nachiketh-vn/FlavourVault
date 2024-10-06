import { HoverEffect } from "../components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Easy Menu Updation",
    description:
      "Instantly update your restaurant's menu with an intuitive interface, ensuring customers always see the latest offerings.",
    link: "/features",
  },
  {
    title: "Promote a Particular Dish",
    description:
      "Highlight daily specials or signature dishes to attract customer attention directly on the digital menu.",
    link: "/features",
  },
  {
    title: "Dish Recommendation System",
    description:
      "Utilize AI-driven recommendations to help diners discover new dishes tailored to their preferences.",
    link: "/features",
  },
  {
    title: "Reduce Menu Cost",
    description:
      "Significantly cut down costs associated with printing by switching to digital menus, saving time and money.",
    link: "/features",
  },
  {
    title: "User-Friendly & Addictive UI",
    description:
      "Enjoy a clean, intuitive design that keeps customers engaged and makes navigation seamless for restaurant staff.",
    link: "/features",
  },
  {
    title: "Admin Dashboard to Get Analytics",
    description:
      "Access real-time analytics to gain insights on customer behavior and optimize your menu offerings effectively.",
    link: "/features",
  },
  {
    title: "Customer Entertainment During Preparation",
    description:
      "Keep customers entertained with current news and fun games while they wait for their orders.",
    link: "/features",
  },
  {
    title: "Multi-Language Support",
    description:
      "Cater to a diverse audience by providing multi-language support for easy menu navigation.",
    link: "/features",
  },
  {
    title: "Call Waiter Option",
    description:
      "Allow customers to call a waiter directly from the app for improved service efficiency.",
    link: "/features",
  },
];

