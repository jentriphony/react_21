import {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {actions as pagesAuthSliceActions} from './redux/pages/auth/auth'
import Layout from './components/Layout/Layout'
import Router from './components/Router/Router'
const App = props => {
  const dispatch = useDispatch()
  const intervalHandler = useCallback(() => dispatch(pagesAuthSliceActions.setInterval()), [dispatch])
  const startInterval = useCallback(() => setInterval(intervalHandler, 8000), [intervalHandler])
  useEffect(() => {
    if(localStorage.getItem('remaining') === '0') {
      dispatch(pagesAuthSliceActions.reset())
      return
    }
    if(+localStorage.getItem('remaining') > 0) {
      const interval = startInterval()
      dispatch(pagesAuthSliceActions.setInterval({interval}))
    }
  }, [startInterval, dispatch])
  return <Layout><Router/></Layout>
}
export default App