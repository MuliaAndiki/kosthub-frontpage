import { TextField } from "@mui/material";
import { TextFieldType } from "@/app/types/ui";

export default function TextFieldInput({
  name,
  onChange,
  value,
  ...props
}: TextFieldType) {
  return (
    <TextField
      label={props.label}
      className={props.className}
      name={name}
      value={value}
      variant="outlined"
      onChange={onChange}
      type={props.type}
    />
  );
}
