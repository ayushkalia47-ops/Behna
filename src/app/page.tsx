import { HeroVideo } from "@/components/home/HeroVideo";
import { Collection } from "@/components/home/Collection";
import { Manifesto } from "@/components/home/Manifesto";
import { Editorial } from "@/components/home/Editorial";
import { Categories } from "@/components/home/Categories";
import { Waitlist } from "@/components/home/Waitlist";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <Collection />
      <Manifesto />
      <Editorial />
      <Categories />
      <Waitlist />
    </>
  );
}
