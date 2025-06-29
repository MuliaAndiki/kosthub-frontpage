import {
  ShowerHead,
  Wifi,
  Home,
  Bed,
  HelpCircle,
  Container,
} from "lucide-react";
import { JSX } from "react";

export type Fasilitas = "Wifi" | "Kasur" | "Kamar" | "Kamar Mandi" | "Lemari";

export const fasilitasIcons: Record<Fasilitas, JSX.Element> = {
  Wifi: <Wifi size={24} />,
  Kasur: <Bed size={24} />,
  Kamar: <Home size={24} />,
  Lemari: <Container size={24} />,
  "Kamar Mandi": <ShowerHead size={24} />,
};

export const getFasilitas = (nama: string): JSX.Element => {
  return fasilitasIcons[nama as Fasilitas] || <HelpCircle size={24} />;
};
