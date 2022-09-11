import classes from './Navigation.module.css'
import {useState, useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {actions as pagesAuthSliceActions} from './../../../redux/pages/auth/auth'
import {NavLink} from 'react-router-dom'
const Component = props => {
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const pagesAuthSlice = useSelector(store => store.pagesAuth)
  const dispatch = useDispatch()
  const routerNavigateHook = useNavigate()
  const logoutHandler = useCallback(() => {
    dispatch(pagesAuthSliceActions.reset())
    routerNavigateHook(pagesPathsSlice.home.home)
  }, [dispatch, routerNavigateHook, pagesPathsSlice])
  const linkActiveClassNameHandler = useCallback(callbackProps => {
    if(callbackProps.isActive) return classes.active
  }, [])
  const DOMHandler = useCallback(() => {
    let links = [<li key={`layout-header-navigation-link-${pagesPathsSlice.home.home.slice(1)}`}>
      <NavLink to={pagesPathsSlice.home.home} className={linkActiveClassNameHandler}>
        {pagesPathsSlice.home.home.slice(1)}
      </NavLink>
    </li>]
    if(!pagesAuthSlice.data.idToken) links.push(<li key={`layout-header-navigation-link-${pagesPathsSlice.auth.auth.slice(1)}`}>
      <NavLink to={pagesPathsSlice.auth.auth} className={linkActiveClassNameHandler}>
        {pagesPathsSlice.auth.auth.slice(1)}
      </NavLink>
    </li>)
    else for(const [key, value] of Object.entries(pagesPathsSlice))
      if(key === 'home' || key === 'auth') continue
      else links.push(<li key={`layout-header-navigation-link-${value[key].slice(1)}`}>
        <NavLink to={value[key]} className={linkActiveClassNameHandler}>
          {value[key].slice(1)}
        </NavLink>
      </li>)
    return <ul>
      {links}
      {!!pagesAuthSlice.data.idToken && <button type='button' onClick={logoutHandler}>
        logout
      </button>}
    </ul>
  }, [pagesPathsSlice, pagesAuthSlice, linkActiveClassNameHandler, logoutHandler])
  const [DOM, setDOM] = useState(DOMHandler())
  useEffect(() => {
    setDOM(DOMHandler())
  }, [DOMHandler])
  return <nav className={classes.nav} id='immune-click-away'>
    {DOM}
  </nav>
}
export default Component