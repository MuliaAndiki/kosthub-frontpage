import { labels } from "../data/constants/rating";
export const getGenderString = (gender: boolean | undefined) => {
  return gender === true ? "Laki" : "Perempuan";
};

export const getStatusString = (filename: string | undefined) => {
  return filename?.includes("Kontrak kos") ? "Paid" : filename || "";
};

export const getLabelText = (value: number) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};
