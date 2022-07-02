import styled from '@emotion/styled'
import { useEffect, useState } from 'react';
import { useCategories } from '../../context/category-context';
import { typography } from '../../styles';
import CardTransaction from '../CardTransaction';
import CategoryCheckbox from '../CategoryCheckbox/CategoryCheckbox';
import InputFilter from '../InputFilter';
import * as Style from "./ui";

const TransactionTitle =styled.h1` 
  ${typography.head['sm']}
`;

const AsideWrapper =  styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 24px 8px 0 32px;
  border-left: 1px solid #D1D5DB;
`;

function Aside(){
  const { transactions, params, categories, setTransactions } = useCategories();
  const [transacFilter, setTransacFilter] = useState([]);

  useEffect(() => {
    let partial = [];
    categories.forEach(category => {
      const newTransactions = category.transactions.map(transaction => (
        {
          ...transaction,
          categoryName: category.name,
          color: category.color,
          icon: category.icon,
          tran_type: category.transaction_type
        }
        ));
        
        partial.push(...newTransactions)}
        );

      partial = partial?.reduce((acc, tran) => {
        acc[tran.date] = [...acc[tran.date] || [], tran];
        return acc;
      }, {})

    setTransactions(partial);
    setTransacFilter(partial);
  }, [categories, setTransactions]);

  const dates = Object.keys(transacFilter).filter(date => {
    const [ year, month ] = date.split("-");
    return parseInt(year) === parseInt(params.year) && parseInt(month) - 1 === parseInt(params.month);
  })

  function handleChecked(value) {
    let newTransactions = {};

    dates.forEach(date => {
      newTransactions[date] = transactions[date].filter(transac => (transac.categoryName.includes(value)))
    })
    setTransacFilter(newTransactions);
  }

  return(
    <AsideWrapper>
      <TransactionTitle>Transactions</TransactionTitle>
      <CategoryCheckbox/>
      <Style.Section>
        <Style.Title>Amount</Style.Title>
        <Style.InputsContainer>
          <InputFilter label="min"/>
          <InputFilter label="max"/>
        </Style.InputsContainer>
      </Style.Section>

      <Style.Section>
        <Style.Title>Date</Style.Title>
        <Style.InputsContainer>
          <InputFilter label="from" type="date"/>
          <InputFilter label="to" type="date"/>
        </Style.InputsContainer>
      </Style.Section>

      <Style.CardsWrapper>
      { dates.map((date, index) => {
          const amount = transacFilter[date].reduce((acc, el) => (
            el.tran_type === "expense" ? acc - el.amount : el.amount + acc 
          ), 0);

          return (
            <>
              <CardTransaction 
                type="day"
                date={date}
                amount={amount}
                key={index}
                tran_type={amount < 0 ? "expense" : "income"}
              />
              {transacFilter[date].map((transaction, index) => (
                <CardTransaction 
                  type="transaction"
                  date={transaction.date}
                  amount={transaction.amount}
                  transaction={transaction.categoryName}
                  description="Description"
                  tran_type={transaction.tran_type}
                  iconName={transaction.icon}
                  color={transaction.color}
                  key={index}
                />
              ))}
            </>
          )
        }) }
      </Style.CardsWrapper>
    </AsideWrapper>
  )
}

export default Aside;
