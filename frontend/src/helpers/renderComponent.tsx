import { lazy, Suspense } from "react";
const Hero = lazy(() => import("../components/sections/Hero"));
const HeroVertical = lazy(() => import("../components/sections/HeroVertical"));
import type { SectionType } from "../types";

export const renderComponent = (section: SectionType) => {
  switch (section.__typename) {
    case "ComponentHeroHeroSection":
      return (
        <Suspense fallback={<></>}>
          <Hero {...section} />
        </Suspense>
      );

    case "ComponentHeroHeroVertical":
      return (
        <Suspense fallback={<></>}>
          <HeroVertical {...section} />
        </Suspense>
      );

    default:
      return null;
  }
};
