import { TextField } from "@material-ui/core";

const Input = ({ name, type, label, value, error, onChange }) => {
  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>
  );
};

export default Input;
