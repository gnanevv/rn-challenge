import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  connectorTypes: string[];
  connectorStatuses: string[];
}

const initialState: FilterState = {
  connectorTypes: [],
  connectorStatuses: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setConnectorTypes: (state, action: PayloadAction<string[]>) => {
      state.connectorTypes = action.payload;
    },
    setConnectorStatuses: (state, action: PayloadAction<string[]>) => {
      state.connectorStatuses = action.payload;
    },
  },
});

export const { setConnectorTypes, setConnectorStatuses } = filterSlice.actions;
export default filterSlice.reducer;
