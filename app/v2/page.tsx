import Nav from "./components/nav";
import Hero from "./components/hero";
import Work from "./components/work";
import Sprint from "./components/sprint";
import Models from "./components/models";
import Proof from "./components/proof";
import Team from "./components/team";
import Play from "./components/play";
import Closing from "./components/closing";
import PlayFab from "./components/play-fab";

export default function V2Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Sprint />
        <Models />
        <Proof />
        <Team />
        <Play />
        <Closing />
      </main>
      <PlayFab />
    </>
  );
}
