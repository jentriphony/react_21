import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'pagesUrls',
  initialState: {
    auth: {
      signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=<key>',
      signIn: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=<key>',
      resetPassword: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=<key>'
    }
  },
  reducers: {}
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice