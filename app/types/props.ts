import { itemsType, ReviewType, reservasiType } from "@/app/types/API";

import {
  bestReviewType,
  appFooterType,
  ourServicesType,
  bestPropertyType,
} from "@/app/types/components";

export interface ourServicesTypeProps {
  data: ourServicesType;
}
export interface bestPropertyTypeProps {
  data: bestPropertyType;
}
export interface bestReviewTypeProps {
  data: bestReviewType;
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
