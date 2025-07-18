export interface RouteStatic {
  login: {
    title: string;
    href: string;
  };
  register: {
    title: string;
    href: string;
  };
}

export type ProvinceName = string;

export interface RouteStaticProfile {
  href: string;
  icon: any;
  label: string;
}

export interface RouteStaticLanding {
  label: string;
  href: string;
}

export interface RouteStaticInformation {
  label?: string;
  icon: any;
  href: string;
}

export interface ListConfig {
  label: string;
}
