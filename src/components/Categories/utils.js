import { parseISO } from "date-fns";
import { categoryColors, categoryIcons } from "../../utils";

export const getMonthlyData = (categories, date, type) => {
  return categories
    .filter((cat) => cat["transaction_type"] === type)
    .map((cat) => {
      return {
        id: cat.id,
        name: cat.name,
        Icon: categoryIcons[cat.icon],
        color: categoryColors[cat.color],
        amount: cat.transactions.reduce((acc, cur) => {
          const trxDate = parseISO(cur.date);
          const trxYear = trxDate.getFullYear();
          const trxMonth = trxDate.getMonth();
          if (trxYear === date.year && trxMonth === date.month) {
            return acc + cur.amount;
          } else {
            return acc;
          }
        }, 0),
      };
    });
};
