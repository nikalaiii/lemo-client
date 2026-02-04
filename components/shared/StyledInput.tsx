import { TextField } from "@mui/material";

interface StyledInputPtops {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: "text" | "password" | "email";
  fullWidth?: boolean;
}

const StyledInput: React.FC<StyledInputPtops> = ({
  value,
  onChange,
  type,
  fullWidth = false,
  label
}) => {
  return (
    <TextField
    sx={{ maxWidth: "400px"}}
    label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth={fullWidth}
      variant="outlined"
      margin="normal"
      type={type}
    />
  );
};

export default StyledInput;
