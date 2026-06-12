import Sidebar from "./components/sidebar";
import Hatch from "./components/hatch";
import About from "./components/about";
import WorksSection from "./components/works-section";
import Services from "./components/services";
import Process from "./components/process";
import ClientsSection from "./components/clients-section";
import ContactSection from "./components/contact-section";
import Testimonials from "./components/testimonials";
import TeamSection from "./components/team-section";
import FooterSection from "./components/footer-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Outer bordered document container */}
      <div className="mx-auto border-x border-[#dbd9d1] min-h-screen flex">

        {/* Sticky sidebar */}
        <Sidebar />

        {/* Main scrollable content */}
        <main className="flex-1 min-w-0 overflow-x-hidden flex flex-col divide-y-0 pt-10 md:pt-0">

          <About />
          <Hatch />
          <WorksSection />
          <Hatch />
          <Services />
          <Hatch />
          <Process />
          <Hatch />
          <ClientsSection />
          <Hatch />
          <Testimonials />
          <Hatch />
          <TeamSection />
          <Hatch />
          <ContactSection />
          <Hatch />
          <FooterSection />
        </main>

      </div>
    </div>
  );
}
