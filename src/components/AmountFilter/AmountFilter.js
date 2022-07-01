import styled from '@emotion/styled'
import React from 'react'
import { FilterTitle } from '../CategoryCheckbox/CategoryCheckbox'
import Input from '../input'


const AmountFildSet = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
`

const FildSetInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

const AmountFilter = () => {
  return (
    <AmountFildSet>
      <FilterTitle>Amount</FilterTitle>
      <FildSetInput>
        <Input
          label="Min"
          name="min-amount"
        />
        <Input
          label="Max"
          name="max-amount"
        />
      </FildSetInput>
    </AmountFildSet>
  )
}
export default AmountFilter