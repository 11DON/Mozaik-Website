import { div } from "framer-motion/client";
import MissionVisionSection from "../components/missionVisionSection";
import OurJourney from "../components/ourJourney";
import ContactBanner from "../components/contactBanner";

export default function WhoWeArePage() {
    return (
        <div>
            <MissionVisionSection />
            <OurJourney />
            <ContactBanner/>
        </div>
    )
}