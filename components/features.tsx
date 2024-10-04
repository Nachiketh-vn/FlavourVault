import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-4xl  px-4 lg:w-4/5 mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl  border border-transparent  bg-black"></div>
);

const items = [
  {
    title: "Real-Time Menu Updates",
    description:
      "Instantly update menu items and prices, ensuring customers always see the latest offerings.",
    header: <Skeleton />,
    className: "md:col-span-2 bg-black text-white border-white",
  },
  {
    title: "Mobile-Friendly and Accessible",
    description:
      "Allow customers to browse your menu easily on any device, enhancing convenience and engagement.",
    header: <Skeleton />,
    className: "md:col-span-1 bg-black text-white border-white",
  },
  {
    title: "Cost-Efficient and Eco-Friendly",
    description:
      "Save on printing costs while reducing paper waste by switching to a digital menu.",
    header: <Skeleton />,
    className: "md:col-span-1 bg-black text-white border-white",
  },
  {
    title: "Enhanced Customer Experience",
    description:
      "Provide interactive features like images and dietary filters for a personalized dining experience.",
    header: <Skeleton />,
    className: "md:col-span-2 bg-black text-white border-white",
  },
  {
    title: "Better Marketing Opportunities",
    description:
      "Utilize your online menu for promotions and social media engagement to attract new customers.",
    header: <Skeleton />,
    className: "md:col-span-2 bg-black text-white border-white",
  },
  {
    title: "Analytics and Insights",
    description:
      "Track customer preferences and item popularity to make informed menu decisions and optimize offerings.",
    header: <Skeleton />,
    className: "md:col-span-1 bg-black text-white border-white",
  },
];

