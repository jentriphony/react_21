import classes from './Notification.module.css'
import {useCallback, Fragment} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actions as sliceActions} from './../../../redux/ui/layout-header-notification'
const Component = props => {
  const slice = useSelector(store => store.uiLayoutHeaderNotification)
  const dispatch = useDispatch()
  const reset = useCallback(() => dispatch(sliceActions.reset()), [dispatch])
  return <Fragment>
    {slice.visible && <div className={classes.notification}>
      <span>{slice.status}</span>
      <span>{slice.message}</span>
      <button type='button' onClick={reset}>
        x
      </button>
    </div>}
  </Fragment>
}
export default Component