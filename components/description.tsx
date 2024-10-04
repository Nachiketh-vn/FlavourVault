"use client";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

const words = `FlavourVault offers advanced digital QR menu solutions, empowering
              restaurants to effortlessly manage and update menus while
              enhancing the dining experience.`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
