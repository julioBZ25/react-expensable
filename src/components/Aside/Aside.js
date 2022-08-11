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
  const [minFilter, setminFilter] = useState('')
  const [maxFilter, setmaxFilter] = useState('')
  const [filters, setFilters] = useState(categories.map(category => category.name));
  const [dates, setDates] = useState([]);
  console.log('filtro inicial', filters)

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

    let initialDates = Object.keys(partial).filter(date => {
      const [ year, month ] = date.split("-");
      return parseInt(year) === parseInt(params.year) && parseInt(month) - 1 === parseInt(params.month);
    })
    setDates(initialDates);

  }, [categories, setTransactions, params]);

  useEffect(() => {
    let newTransactions = {};
    // if (!filters.length) return
    // if (newTransactions !== null) {}
    if (filters.length !== 0) {
      dates.forEach(date => {
        newTransactions[date] = transactions[date].filter((transac) => {
          return filters.includes(transac.categoryName)
        })
      })
      console.log(transactions)
      setTransacFilter(newTransactions);
    }else {
      setTransacFilter(transactions);
    }
  }, [filters, dates, transactions]);

  function handleChecked(value) {

    if(!filters.includes(value)) {
      setFilters([...filters, value]);
    }else {
      const index = filters.findIndex(cat => cat === value);
      filters.splice(index, 1);
      setFilters([...filters]);
    }
  }

  //Filter Amount Logic
  function HandleInput(event){
    switch (event.target.name) {
      case 'min':
        setminFilter(event.target.value)
        break;
      case 'max':
        setmaxFilter(event.target.value)
        break;
      default:
        break;
    }
  }

  let amountFiltered = {};
  dates?.forEach( (date) => {
    amountFiltered[date] = transacFilter[date]?.map( (transaction) => {
      const min =  minFilter === '' ? 0 : +minFilter
      const max = maxFilter === '' ? Infinity : +maxFilter
      if (transaction.amount >= min){
        if(maxFilter === '0'){
          return transaction
        }
        else if (transaction.amount <= max){
          return transaction
        }
      }
    }).filter( (el) => el !== undefined )
  })

  return (
    <AsideWrapper>
      <TransactionTitle>Transactions</TransactionTitle>
      <CategoryCheckbox onChecked={handleChecked} />
      <Style.Section>
        <Style.Title>Amount</Style.Title>
        <Style.InputsContainer>
          <InputFilter label="min" onInputChange={HandleInput} value={minFilter} placeholder={0}/>
          <InputFilter label="max" onInputChange={HandleInput} value={maxFilter} placeholder={100}/>
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
      { dates?.map((date, index) => {
          const amount = amountFiltered[date]?.reduce((acc, el) => (
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
              {amountFiltered[date]?.map((transaction, index) =>  {
                return (
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
              )})}
            </>
          )
        })}
      </Style.CardsWrapper>
    </AsideWrapper>
  )
}

export default Aside;
