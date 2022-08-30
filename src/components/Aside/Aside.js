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
  const [minFilter, setminFilter] = useState('');
  const [maxFilter, setmaxFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filters, setFilters] = useState(categories.map(category => category.name));
  const [dates, setDates] = useState([]);
  let amountFiltered = {};

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
    if (filters.length !== 0) {
      dates.forEach(date => {
        newTransactions[date] = transactions[date].filter((transac) => {
          return filters.includes(transac.categoryName)
        })
      })
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
  function handleInput(event){
    switch (event.target.name) {
      case 'min':
        setminFilter(event.target.value);
        break;
      case 'max':
        setmaxFilter(event.target.value);
        break;
      case 'from':
        setStartDate(event.target.value);
        break;
      case 'to':
        setEndDate(event.target.value);
        break;
      default:
        break;
    }
  }

  dates?.forEach( (date) => {
    amountFiltered[date] = transacFilter[date]?.filter( (transaction) => {
      const min =  minFilter === '' ? 0 : +minFilter;
      const max = maxFilter === '' ? Infinity : +maxFilter;
      const fromDate = !startDate || new Date(startDate).getTime() <= new Date(transaction.date).getTime(); 
      const toDate = !endDate || new Date(endDate).getTime() >= new Date(transaction.date).getTime();
      return (transaction.amount >= min && transaction.amount <= max &&  fromDate && toDate);
    })
  })
  
  return (
    <AsideWrapper>
      <TransactionTitle>Transactions</TransactionTitle>
      <CategoryCheckbox onChecked={handleChecked} />
      <Style.Section>
        <Style.Title>Amount</Style.Title>
        <Style.InputsContainer>
          <InputFilter label="min" onInputChange={handleInput} value={minFilter} placeholder={0}/>
          <InputFilter label="max" onInputChange={handleInput} value={maxFilter} placeholder={100}/>
        </Style.InputsContainer>
      </Style.Section>

      <Style.Section>
        <Style.Title>Date</Style.Title>
        <Style.InputsContainer>
          <InputFilter label="from" type="date" onInputChange={handleInput} value={startDate || ''} />
          <InputFilter label="to" type="date" onInputChange={handleInput} value={endDate || ''}/>
        </Style.InputsContainer>
      </Style.Section>

      <Style.CardsWrapper>
      { dates?.map((date, index) => {
          const amount = amountFiltered[date]?.reduce((acc, el) => (
            el.tran_type === "expense" ? acc - el.amount : el.amount + acc 
          ), 0);

          return (
            <div key={index}>
              <CardTransaction 
                type="day"
                date={date}
                amount={amount}
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
            </div>
          )
        })}
      </Style.CardsWrapper>
    </AsideWrapper>
  )
}

export default Aside;
