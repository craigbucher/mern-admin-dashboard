import { createSlice } from "@reduxjs/toolkit";
// A "slice" is a collection of Redux reducer logic and actions for a 
// single feature in your app, typically defined together in a single file


const initialState = {
  mode: "dark",
  // simulating user login (not covered in this tutorial):
  // userId: "63701cc1f03239b7f700000e", // userId from mock data in backend = 'Shelly'
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {		// reducers = 'updates the state and responds with the new state'
    setMode: (state) => {
			// set 'state.mode' to it's opposite setting:
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// export 'setMode' as the actions performed in 'globalSlice'
export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;