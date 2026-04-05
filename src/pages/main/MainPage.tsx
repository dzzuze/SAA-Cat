import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import QuizPromoSection from "./components/QuizPromoSection";
import TopicsSection from "./components/TopicsSection";

export default function MainPage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <TopicsSection />
      <QuizPromoSection />
    </main>
  );
}
