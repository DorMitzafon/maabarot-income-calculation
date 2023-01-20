import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Infrastructure {
    houseSize: number;
    electricity: number;
    water: number;
}

const initialState: Infrastructure = {
    houseSize: 0,
    electricity: 0,
    water: 0,
};

export const incomeSlice = createSlice({
  name: 'infrasturcture',
  initialState,
  reducers: {
    updateElectricityPrice: (state, action: PayloadAction<number>) => {
      state.electricity = action.payload
    },
    updateWaterPrice: (state, action: PayloadAction<number>) => {
        state.water = action.payload
    },
    updateHouseSize: (state, action: PayloadAction<number>) => {
        state.houseSize = action.payload
    },
  },
})

export const { updateElectricityPrice, updateWaterPrice, updateHouseSize } = incomeSlice.actions
export default incomeSlice.reducer