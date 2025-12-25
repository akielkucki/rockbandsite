import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MusicMap from "@/components/MusicMap";
import About from "@/components/About";
import Tour from "@/components/Tour";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <main>
        <Hero />
        <MusicMap />
        <About />
        <Tour />
        <Contact />
      </main>
    </div>
  );
}
