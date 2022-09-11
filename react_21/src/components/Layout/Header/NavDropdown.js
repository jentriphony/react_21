import {Fragment} from 'react'
import useUiClickAway from './../../../hooks/ui/click-away'
import Navigation from './Navigation'
const Component = props => {
  const uiClickAwayHook = useUiClickAway()
  return <Fragment>
    <button type='button' id='immune-click-away-button' onClick={uiClickAwayHook.visibilityHandler}>
      menu
    </button>
    {uiClickAwayHook.visible && <Navigation/>}
  </Fragment>
}
export default Component