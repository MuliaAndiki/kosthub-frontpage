import { ButtonPopUpType } from "../../../types/ui";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";

export default function ButtonPopUp({
  children,
  message,
  onClick,
  ...prev
}: ButtonPopUpType) {
  return (
    <Box sx={{ "& button": { m: 1, fontWeight: "bold" } }}>
      <MuiButton
        variant="contained"
        size="medium"
        onClick={onClick}
        color={message}
        sx={{ width: "100%" }}
      >
        {children}
      </MuiButton>
    </Box>
  );
}
