import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: {},
}

export const userSlice = createSlice({
  name: 'setter',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer