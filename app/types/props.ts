import { itemsType, ReviewType, reservasiType } from "@/app/types/API";

import {
  bestReviewType,
  appFooterType,
  ourServicesType,
  Product,
} from "@/app/types/components";

export interface ourServicesTypeProps {
  data: ourServicesType;
}
export interface bestReviewTypeProps {
  data: bestReviewType;
}

export interface productProps {
  data: Product;
}
export interface reviewTypeProps {
  data: ReviewType;
}
export interface itemsTypeProps {
  data: itemsType;
}

export interface appFooterTypeProps {
  data: appFooterType;
}
export interface reservasiTypeProps {
  data: reservasiType;
}
