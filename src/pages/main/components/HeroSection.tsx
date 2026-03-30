import Button from "../../../components/ui/Button";
import { heroData } from "../data/mainPageData";
import heroImage from "../../../assets/main-page-cat.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-app py-16 sm:py-20 lg:py-24 transition-colors duration-300">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
            {heroData.badge}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {heroData.titleStart}{" "}
            <span className="text-main-yellow">{heroData.titleHighlight}</span>{" "}
            {heroData.titleEnd}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-text-muted sm:text-lg">
            {heroData.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button onClick={() => navigate("/dashboard?difficulty=beginner")}>
              {heroData.primaryButtonText}
            </Button>

            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              {heroData.secondaryButtonText}
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-border-soft bg-surface shadow-xl">
          <div className="aspect-[16/10] w-full">
            <img
              src={heroImage}
              alt="Coding practice platform preview"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
