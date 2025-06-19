import { ButtonType } from "../../../types/ui";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
export default function Button({ children, onClick, ...props }: ButtonType) {
  return (
    <Box sx={{ "& button": { m: 1, fontWeight: "bold" } }}>
      <MuiButton
        variant="contained"
        size="medium"
        onClick={onClick}
        sx={{ width: "100%" }}
      >
        {children}
      </MuiButton>
    </Box>
  );
}
