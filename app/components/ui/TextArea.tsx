// components/TextArea.tsx
import { TextareaType } from "../../types/ui";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Box } from "@mui/material";

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
}: TextareaType) {
  return (
    <Box
      sx={{
        width: 600,
        border: "1px solid #f9f9f9 ",
        borderRadius: 2,
        padding: 1,
        backgroundColor: "#f9f9f9",
      }}
    >
      <TextareaAutosize
        aria-label={label}
        value={value}
        onChange={onChange}
        minRows={3}
        placeholder={placeholder}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          resize: "none",
          padding: "8px",
          boxSizing: "border-box",
        }}
      />
    </Box>
  );
}
