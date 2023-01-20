import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChildrenTypes, Kindergartens } from '../constants';

interface ChildStatus {
    education: ChildrenTypes;
    isFormal?: boolean;
    kindergarten: Kindergartens;
}

type ChildrenStatus = Record<string, ChildStatus>;
interface Family {
    children: ChildrenStatus
}

const initialState: Family = {
  children: {}
};

export const incomeSlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    updateChildren: (state, action: PayloadAction<ChildrenStatus>) => {
      state.children = {...state.children, ...action.payload};
    },
    deleteChild: (state, action: PayloadAction<number>) => {
      delete state.children[action.payload];
    }
  },
})

export const { updateChildren, deleteChild } = incomeSlice.actions
export default incomeSlice.reducer