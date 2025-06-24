import { itemsType } from "../API";

export interface ourServicesType {
  image: string;
  title: string;
  deskripsi: string;
}

export interface bestReviewType {
  image: string;
  title: string;
  date: string;
  gambar: string;
  deskripsi: string;
  avgBintang: number;
}

export interface appFooterType {
  footerLeft: {
    image: any;
    title: string;
    desc: string;
  };

  footerRight: {
    title: string;
    href: string;
  }[];
}

export interface bestPropertyType {
  image: string;
}

export interface popUP {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface SelectRole {
  user: string;
  owner: string;
}

export interface MedsosConfig {
  image: any;
  href: string;
  label: string;
}

export interface ownerProfileConfig {
  foto: {
    image?: string;
    username?: string;
  };
  detail: {
    label?: string;
    datas?: string;
  }[];
}

export interface NotifikasiConfig {
  field: string;
  label: string;
  value?: (item: itemsType) => React.ReactNode;
}
