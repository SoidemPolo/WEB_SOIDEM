import { BeforeAfter } from "@/components/sections/before-after";
import { Cases } from "@/components/sections/cases";
import { ClientProof } from "@/components/sections/client-proof";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Iso } from "@/components/sections/iso";
import { MethodBand } from "@/components/sections/method-band";
import { Problems } from "@/components/sections/problems";
import { Products } from "@/components/sections/products";
import { Tech } from "@/components/sections/tech";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <ClientProof />
      <MethodBand />
      <BeforeAfter />
      <Cases />
      <Products />
      <Tech />
      <Iso />
      <FinalCta />
    </>
  );
}
