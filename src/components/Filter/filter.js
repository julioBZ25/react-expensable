import InputFilter from "../InputFilter";
import * as Style from "./styles";

function Filter() {
  return (
    <Style.Section>
      <Style.Title>Date</Style.Title>
      <Style.InputsContainer>
        <InputFilter label="from" type="date" />
        <InputFilter label="to" type="date" />
      </Style.InputsContainer>
    </Style.Section>
  );
}

export default Filter;
