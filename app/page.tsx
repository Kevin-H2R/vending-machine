"use client"
import { MachineProvider } from "@/utils/MachineContext";
import SlotSection from "./SlotSection";
import InputSection from "./InputSection";

export default function Home() {

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <MachineProvider>
        <div className="flex basis-2/3">
          <SlotSection />
        </div>
        <div className="flex basis-1/3">
          <InputSection />
        </div>
      </MachineProvider>
    </main>
  );
}
