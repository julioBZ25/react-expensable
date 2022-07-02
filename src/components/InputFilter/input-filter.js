import * as Style from "./styles";

function InputFilter({ label, type, value, placeholder = "", onInputChange}) {
  return (
    <Style.Container>
      <Style.Label htmlFor={label}>{label}</Style.Label>
      <Style.StyledInput
        id={label}
        name={label}
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onInputChange(event)}
      />
    </Style.Container>
  );
}

export default InputFilter;
