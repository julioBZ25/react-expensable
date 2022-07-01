import styled from '@emotion/styled'
import React from 'react'
import { typography } from '../../styles';
import AmountFilter from '../AmountFilter/AmountFilter';
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
  return(
    <AsideWrapper>
      <TransactionTitle>Transactions</TransactionTitle>
      <CategoryCheckbox/>
      <AmountFilter/>
      <Style.Section>
        <Style.Title>Date</Style.Title>
        <Style.InputsContainer>
          <InputFilter label="from" type="date"/>
          <InputFilter label="to" type="date"/>
        </Style.InputsContainer>
      </Style.Section>
      <Style.CardsWrapper>
        <CardTransaction 
          type="day"
          date="2022-05-15"
          amount={700}
        />
        <CardTransaction 
          type="transaction"
          date="2022-05-10"
          amount={350}
          transaction="Rent"
          tran_type="expense"
          iconName="bank"
          color="orange"
        />
        <CardTransaction 
          type="transaction"
          date="2022-05-09"
          amount={800}
          description="Description"
          transaction="Work"
          tran_type="income"
          iconName="gift"
          color="teal"
        />
        <CardTransaction 
          type="day"
          date="2018-09-31"
          amount={700}
          tran_type="expense"
        />
      </Style.CardsWrapper>
    </AsideWrapper>
  )
}

export default Aside