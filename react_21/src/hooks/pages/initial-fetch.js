import {useState, useCallback, useContext, useEffect} from 'react'
import FetchContext from '../../context/fetch'
import {useSelector, useDispatch} from 'react-redux'
import {actions as pagesInitialSliceActions} from '../../redux/pages/initial'
const Hook = props => {
  const {
    actionName,
    actionProps,
    actionSliceTail,
    onFinish: onFinishProp,
    sliceTail,
    urlTail,
    dataTail,
    configuration,
    onStart,
    onError,
    onSuccess,
    sliceFetchAction,
    pagesInitialSliceTail
  } = props
  const fetchContext = useContext(FetchContext)
  const dispatch = useDispatch()
  const pagesInitialSlice = useSelector(store => store.pagesInitial)
  const pagesInitialSliceWithTailHandler = useCallback(() => {
    const pagesInitialSliceTailArray = pagesInitialSliceTail.split('.')
    let pagesInitialSliceWithTail = pagesInitialSlice
    for(let iterator = 0; iterator < pagesInitialSliceTailArray.length; ++iterator)
      pagesInitialSliceWithTail = pagesInitialSliceWithTail[iterator]
    return pagesInitialSliceWithTail
  }, [pagesInitialSliceTail, pagesInitialSlice])
  const [pagesInitialSliceWithTail, setPagesInitialSliceWithTail] = useState(pagesInitialSliceWithTailHandler())
  const onFinish = useCallback(callbackProps => {
    dispatch(pagesInitialSliceActions.set({...callbackProps, sliceTail: pagesInitialSliceTail}))
    onFinishProp && onFinishProp(callbackProps)
  }, [dispatch, pagesInitialSliceTail])
  useEffect(() => {
    !pagesInitialSliceWithTail && dispatch(sliceFetchAction({
      onFinish,
      onSuccess,
      onStart,
      onError,
      configuration,
      dataTail,
      urlTail,
      handler: fetchContext.handler,
      actionSliceTail,
      actionName,
      actionProps
    }))
  }, [
    pagesInitialSliceWithTail,
    dispatch,
    sliceFetchAction,
    onFinish,
    onSuccess,
    onError,
    onStart,
    configuration,
    dataTail,
    urlTail,
    fetchContext,
    actionSliceTail,
    actionName,
    actionProps
  ])
  const slice = useSelector(store => store[sliceTail])
  return {slice}
}
export default Hook