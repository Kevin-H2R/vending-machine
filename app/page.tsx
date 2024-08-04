"use client"
import { MachineProvider } from "@/utils/MachineContext";
import SlotSection from "./SlotSection";

export default function Home() {

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <MachineProvider>
        <SlotSection />
        <div className="flex flex-col basis-1/3">You</div>
      </MachineProvider>
    </main>
  );
}
