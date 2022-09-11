import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'uiLayoutHeaderNotification',
  initialState: {
    visible: null,
    status: null,
    message: null
  },
  reducers: {
    set: (slice, props) => {
      slice.visible = props.payload.visible
      slice.status = props.payload.status
      slice.message = props.payload.message
    },
    reset: slice => {
      slice.visible = null
      slice.status = null
      slice.message = null
    }
  }
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice