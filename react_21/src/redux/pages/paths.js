import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'pagesPaths',
  initialState: {
    auth: {auth: '/auth'},
    profile: {profile: '/profile'},
    home: {home: '/home'}
  },
  reducers: {}
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice