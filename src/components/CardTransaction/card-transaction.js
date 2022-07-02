import { categoryColors, categoryIcons } from "../../utils";
import CircleIcon from "../CircleIcon";
import * as Style from "./styles";

function CardTransaction({ type, date, amount, transaction, description, tran_type, iconName, color }) {
  let parseDate = date.split("-");
  const newDate = new Date(parseDate) // date should be a string: "2022-07-01"
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = newDate.toLocaleDateString("en-US", options).replaceAll(",", "");
  const [day, month, weekday, year] = dateString.split(" ");
  let symbol = tran_type === "expense" ? "-" : "+";

  return (
    <Style.Container type={type}>
      {
        type === "day"
        ?
        <>
          <Style.Section>
            <Style.Day>{ weekday }</Style.Day>
            <Style.Info>
              <Style.Text isHead={false}>{ day }</Style.Text>
              <Style.Text isHead={true}>{ `${month}, ${year}` }</Style.Text>
            </Style.Info>
          </Style.Section>
          <Style.Amount tran_type={symbol === "-" ? "expense" : "income"}>{symbol}${ amount < 0 ? amount * -1 : amount  }</Style.Amount>      
        </>
        :
        <>
          <Style.Section>
            <CircleIcon 
              color={categoryColors[color]}
              Icon={categoryIcons[iconName]}
            />
            <Style.Info>
              <Style.Text isHead={true}>{ transaction }</Style.Text>
              <Style.Text isHead={false}>{ description || "No description" }</Style.Text>
            </Style.Info>
          </Style.Section>
          <Style.Amount tran_type={symbol === "-" ? "expense" : "income"}>{symbol}${ amount < 0 ? amount * -1 : amount  }</Style.Amount>      
        </>
      }
    </Style.Container>
  )
}

export default CardTransaction;
