import {createSlice} from '@reduxjs/toolkit'
import {actions as uiLayoutHeaderNotificationSliceActions} from './../../ui/layout-header-notification'
import pagesUrlsSlice from './../urls'
const slice = createSlice({
  name: 'pagesAuth',
  initialState: {
    data: {...JSON.parse(localStorage.getItem('data'))}
  },
  reducers: {
    set: (slice, props) => {
      if(props.payload.errorMessage) return
      const sliceTailArray = props.payload.sliceTail.split('.')
      localStorage.setItem('data', JSON.stringify(props.payload.data))
      if(sliceTailArray.length === 1) {
        slice[sliceTailArray[0]] = props.payload.data
        return
      }
      let sliceWithTail = slice
      for(let iterator = 0; iterator < sliceTailArray.length - 1; ++iterator)
        sliceWithTail = sliceWithTail[sliceTailArray[iterator]]
      sliceWithTail[sliceTailArray[sliceTailArray.length - 1]] = props.payload.data
    },
    reset: slice => {
      slice.data = {}
      localStorage.removeItem('data')
      clearInterval(+localStorage.getItem('interval'))
      localStorage.removeItem('interval')
      localStorage.removeItem('remaining')
    },
    setInterval: (slice, props) => {
      if(props.payload && props.payload.interval) {
        !localStorage.getItem('remaining') && localStorage.setItem('remaining', 8000)
        localStorage.setItem('interval', props.payload.interval)
        return
      }
      if(localStorage.getItem('remaining') === '0') {
        slice.data = {}
        localStorage.removeItem('data')
        clearInterval(+localStorage.getItem('interval'))
        clearInterval(props.payload && props.payload.interval)
        localStorage.removeItem('interval')
        localStorage.removeItem('remaining')
        return
      }
      localStorage.setItem('remaining', +localStorage.getItem('remaining') - 8000)
    }
  }
})
export const fetchAction = props => {
  return async dispatch => {
    const onStart = () => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'loading',
        message: `pages_auth_slice_fetch_${props.actionName}`
      }))
      props.onStart && props.onStart()
    }
    const onSuccess = handlerProps => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'success',
        message: `pages_auth_slice_fetch_${props.actionName}`
      }))
      props.onSuccess && props.onSuccess(handlerProps)
    }
    const onError = handlerProps => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'error',
        message: `pages_auth_slice_fetch_${props.actionName}:\n${handlerProps.errorMessage}`
      }))
      props.onError && props.onError(handlerProps)
    }
    const result = await props.handler({
      onStart,
      url: pagesUrlsSlice.getInitialState().auth[props.urlTail],
      configuration: props.configuration,
      dataTail: props.dataTail,
      onSuccess,
      onError,
      onFinish: props.onFinish
    })
    return dispatch(slice.actions[props.actionName]({
      ...props.actionProps,
      ...result,
      sliceTail: props.actionSliceTail
    }))
  }
}
export const reducer = slice.reducer
export const actions = slice.actions
export default slice