import { BsFillCartFill } from "react-icons/bs";
import { RiBankFill, RiBillFill, RiCarFill, RiGiftFill } from "react-icons/ri";
import { GiHealthNormal } from "react-icons/gi";
import { FaGraduationCap, FaGamepad } from "react-icons/fa";
import { colors } from "./styles";

export const categoryColors = {
  red: colors.red[500],
  orange: colors.orange[500],
  yellow: colors.yellow[500],
  green: colors.green[500],
  teal: colors.teal[500],
  cyan: colors.cyan[500],
  "light-blue": colors.lightBlue[500],
  blue: colors.blue[500],
};

export const categoryIcons = {
  bank: RiBankFill,
  cart: BsFillCartFill,
  health: GiHealthNormal,
  game: FaGamepad,
  bill: RiBillFill,
  education: FaGraduationCap,
  car: RiCarFill,
  gift: RiGiftFill,
};
