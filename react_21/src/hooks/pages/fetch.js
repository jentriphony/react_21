import {useCallback, useContext} from 'react'
import FetchContext from './../../context/fetch'
import {useSelector, useDispatch} from 'react-redux'
const Hook = props => {
  const {
    onStart,
    onSuccess,
    onError,
    onFinish,
    configuration,
    urlTail,
    dataTail,
    actionName,
    actionProps,
    actionSliceTail,
    sliceFetchAction,
    sliceTail
  } = props
  const fetchContext = useContext(FetchContext)
  const dispatch = useDispatch()
  const handler = useCallback(() => {
    dispatch(sliceFetchAction({
      onStart,
      onSuccess,
      onError,
      onFinish,
      configuration,
      urlTail,
      dataTail,
      actionName,
      actionProps,
      actionSliceTail,
      handler: fetchContext.handler
    }))
  }, [
    dispatch,
    sliceFetchAction,
    onStart,
    onSuccess,
    onError,
    onFinish,
    configuration,
    urlTail,
    dataTail,
    actionName,
    actionProps,
    actionSliceTail,
    fetchContext
  ])
  const slice = useSelector(store => store[sliceTail])
  return {handler, slice}
}
export default Hook