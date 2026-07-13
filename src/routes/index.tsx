import { createFileRoute } from "@tanstack/react-router";
import SolarLanding from "@/components/SolarLanding";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <SolarLanding />;
}
