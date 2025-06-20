import { PulseType } from "@/app/types/ui";
export default function Pulse({ className }: PulseType) {
  return <div className={`bg-gray-300 animate-pulse ${className}`} />;
}
