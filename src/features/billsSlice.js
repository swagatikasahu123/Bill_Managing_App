import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bills: [],
  filteredBills: [],
  highlightedBills: [],
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
      state.filteredBills = [...state.bills];
    },
    editBill: (state, action) => {
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
        state.filteredBills = [...state.bills];
      }
    },
    removeBill: (state, action) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
      state.filteredBills = [...state.bills];
    },
    filterByCategory: (state, action) => {
      if (action.payload) {
        state.filteredBills = state.bills.filter(
          (bill) => bill.category.toLowerCase() === action.payload.toLowerCase()
        );
      } else {
        state.filteredBills = [...state.bills];
      }
    },
    calculateMinimumBills: (state, action) => {
      const budget = action.payload;
      let total = 0;
      let highlighted = [];
      
      // Sort the bills by amount in ascending order
      const sortedBills = [...state.bills].sort((a, b) => a.amount - b.amount);
      
      // Calculate minimum number of bills that fit within the budget
      for (const bill of sortedBills) {
        if (total + bill.amount <= budget) {
          total += bill.amount;
          highlighted.push(bill); // Add the bill to the highlighted list
        } else {
          break; // Stop once we exceed the budget
        }
      }
      
      state.highlightedBills = highlighted;
    },
  },
});

export const { addBill, editBill, removeBill, filterByCategory, calculateMinimumBills } =
  billsSlice.actions;
export default billsSlice.reducer;






