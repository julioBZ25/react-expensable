import styled from '@emotion/styled'
import React from 'react'
import { typography } from '../../styles';
import AmountFilter from '../AmountFilter/AmountFilter';
import CategoryCheckbox from '../CategoryCheckbox/CategoryCheckbox';

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
    </AsideWrapper>
  )
}

export default Aside