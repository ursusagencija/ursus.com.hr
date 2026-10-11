import { SliceSimulator, getSlices } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";

type SliceSimulatorPageProps = {
  searchParams: { state?: string };
};

export default function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorPageProps) {
  const slices = getSlices(searchParams.state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
