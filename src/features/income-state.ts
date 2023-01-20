import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Members = Record<string, number>
export interface IncomeState {
  members:  Members;
};

const initialState: IncomeState = {
  members: {}
}

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    updateMembers: (state, action: PayloadAction<Members>) => {
      state.members = {...state.members, ...action.payload};
    },
    deleteMember: (state, action: PayloadAction<number>) => {
      delete state.members[action.payload];
    }
  },
})

export const { updateMembers, deleteMember } = incomeSlice.actions
export default incomeSlice.reducer