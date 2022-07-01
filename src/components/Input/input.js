import * as Style from "./styles";

function Input({ label, type, value = "", placeholder = "" }) {
  return (
    <Style.Container>
      <Style.Label htmlFor={label}>{label}</Style.Label>
      <Style.Input
        id={label}
        name={label}
        type={type || "text"}
        value={value}
        placeholder={placeholder}
      />
    </Style.Container>
  );
}

export default Input;
