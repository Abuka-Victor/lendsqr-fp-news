import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type UserType = {
  displayName: string | null;
  email: string;
  photoURL: string | null;
  uid: string;
};

interface AuthState {
  user: UserType | null;
}

const INITIAL_STATE: AuthState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
