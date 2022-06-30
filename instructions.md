# Expensable Transactions

## Introduction

Render, filter and sort list items is one of the most common features to
implement as a frontend developer. You can leverage the power of React Hooks to
make the job easy and resilient.

This week project consist on implementing the Transactions component for the
Expensable application.

![https://p-vvf5mjm.t4.n0.cdn.getcloudapp.com/items/YEurZobB/91067521-7cb9-40f4-b65e-4dc1818297e0.png?source=viewer&v=7665d23430811dfbe2c8af1b5162d719](https://p-vvf5mjm.t4.n0.cdn.getcloudapp.com/items/YEurZobB/91067521-7cb9-40f4-b65e-4dc1818297e0.png?source=viewer&v=7665d23430811dfbe2c8af1b5162d719)

## Resources

- Figma file: [https://www.figma.com/file/Crqtn0kqnB1EKQWZVXE3of/Expensable-React?node-id=4101%3A1163](https://www.figma.com/file/Crqtn0kqnB1EKQWZVXE3of/Expensable-React?node-id=4101%3A1163)
- Backend API: [https://github.com/codeableorg/expensable-api](https://github.com/codeableorg/expensable-api)

## Requirements

The transaction component should:

- Show all the transactions (expenses and income) for the selected month group
  by date in descending order.
- Each group should show the sum of all the transactions of the day.
- Expenses should be rendered in color red and income in green.
- A click on the filter icon should open the filters box.
- Changes on the filters inputs should update the transaction list on real time.
- Only days with at least one transaction should be printed.
- Implement at least 2 unit test and 1 E2E test.
