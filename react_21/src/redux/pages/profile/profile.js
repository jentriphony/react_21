import {createSlice} from '@reduxjs/toolkit'
import {actions as uiLayoutHeaderNotificationSliceActions} from './../../ui/layout-header-notification'
import pagesUrlsSlice from './../urls'
const slice = createSlice({
  name: 'pagesProfile',
  initialState: {},
  reducers: {
    ignore: () => {}
  }
})
export const fetchAction = props => {
  return async dispatch => {
    const onStart = () => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'loading',
        message: `pages_profile_slice_fetch_${props.actionName}`
      }))
      props.onStart && props.onStart()
    }
    const onSuccess = handlerProps => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'success',
        message: `pages_profile_slice_fetch_${props.actionName}`
      }))
      props.onSuccess && props.onSuccess(handlerProps)
    }
    const onError = handlerProps => {
      dispatch(uiLayoutHeaderNotificationSliceActions.set({
        visible: true,
        status: 'error',
        message: `pages_profile_slice_fetch_${props.actionName}`
      }))
      props.onError && props.onError(handlerProps)
    }
    const result = await props.handler({
      onStart,
      url: pagesUrlsSlice.getInitialState().profile[props.urlTail],
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