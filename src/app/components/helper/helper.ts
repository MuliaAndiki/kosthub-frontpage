export const getGenderString = (gender: boolean | undefined) => {
  return gender === true ? "Laki" : "Perempuan";
};

export const getStatusString = (filename: string | undefined) => {
  return filename?.includes("Kontrak kos") ? "Paid" : filename || "";
};
