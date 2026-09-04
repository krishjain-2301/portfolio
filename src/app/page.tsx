import { Achievements } from "@/components/Achievements";
import { About } from "@/components/About";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { TryHackMeProfile } from "@/components/TryHackMeProfile";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <GitHubActivity />
        <TryHackMeProfile />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
