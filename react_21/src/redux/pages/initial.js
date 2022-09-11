import {createSlice} from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'pagesInitial',
  initialState: {},
  reducers: {
    set: (slice, props) => {
      let result = true
      if(props.payload.errorMessage) result = false
      const sliceTailArray = props.payload.sliceTail.split('.')
      if(sliceTailArray.length === 1) {
        slice[sliceTailArray[0]] = result
        return
      }
      let sliceWithTail = slice
      for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
        sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
      sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = result
      return
    }
  }
})
export const reducer = slice.reducer
export const actions = slice.actions
export default slice