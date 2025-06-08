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
