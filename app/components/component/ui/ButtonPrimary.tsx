import { ButtonPrimayType } from "../../types/ui";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";

export default function ButtonPrimary({ children }: ButtonPrimayType) {
  return (
    <Box sx={{ "& button": { m: 1, fontWeight: "bold" } }}>
      <MuiButton variant="contained" size="medium" sx={{ width: "100%" }}>
        {children}
      </MuiButton>
    </Box>
  );
}
