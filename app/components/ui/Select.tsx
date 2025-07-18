import { SelectType } from "../../types/ui";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomSelect({
  name,
  onChange,
  value,
  children,
  className,
  ...props
}: SelectType) {
  return (
    <FormControl sx={{ minWidth: 200 }} fullWidth>
      <InputLabel id={`${name}-label`}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        className={className}
        id={`${name}-select`}
        value={value}
        onChange={onChange}
        name={name}
        {...props}
      >
        {children}
      </Select>
    </FormControl>
  );
}
