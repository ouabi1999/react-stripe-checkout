import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";


const initialAuthState = {
  isAuthenticated: true,
  user : true,
  loading : false,
  hasErrors: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
      login(state, action){
        state.user = action.payload
        window.localStorage.setItem('isAuthenticated', true)
        
      },
      register(state, action){
        state.user = action.payload
        window.localStorage.setItem('isAuthenticated', true)
        
      },

      logout(state, action) {
        state.user = null
        window.localStorage.setItem('isAuthenticated', false)
        window.location.href="/"
      },
    },
    
  });
  
  export const {login, logout, register} = authSlice.actions;
  export default authSlice.reducer;