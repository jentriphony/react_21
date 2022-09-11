import {useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {fetchAction as sliceFetchAction} from './../../redux/pages/auth/auth'
import {actions as pagesAuthSliceActions} from './../../redux/pages/auth/auth'
import usePagesFetch from './../../hooks/pages/fetch'
import useUiForm from './../../hooks/ui/form'
import Input from './../UI/Input'
const Component = props => {
  const [[emailInput, setEmailInput], [passwordInput, setPasswordInput]] = [useState({
    value: '',
    valid: null
  }), useState({
    value: '',
    valid: null
  })]
  const [emailValidationHandler, passwordValidationHandler] = [
    useCallback(callbackProps => /.@./.test(callbackProps), []),
    useCallback(callbackProps => callbackProps.trim() !== '', [])]
  const [isCreating, setIsCreating] = useState(null)
  const isCreatingHandler = useCallback(() => setIsCreating(state => !state), [])
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const routerNavigateHook = useNavigate()
  const dispatch = useDispatch()
  const intervalHandler = useCallback(() => dispatch(pagesAuthSliceActions.setInterval()), [dispatch])
  const authIntervalHandler = useCallback(() => setInterval(intervalHandler, 8000), [intervalHandler])
  const pagesFetchHookOnSuccess = useCallback(() => {
    routerNavigateHook(pagesPathsSlice.home.home)
    const interval = authIntervalHandler()
    dispatch(pagesAuthSliceActions.setInterval({interval}))
  }, [routerNavigateHook, pagesPathsSlice, authIntervalHandler, dispatch])
  const pagesFetchHook = usePagesFetch({
    sliceFetchAction,
    configuration: {
      method: 'post',
      headers: {'Content-Type': 'applicatin/json'},
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
        returnSecureToken: true
      })
    },
    urlTail: isCreating ? 'signUp' : 'signIn',
    onSuccess: pagesFetchHookOnSuccess,
    actionName: 'set',
    actionSliceTail: 'data',
    sliceTail: 'auth'
  })
  const uiFormHook = useUiForm({
    inputs: [emailInput, passwordInput],
    onSubmit: pagesFetchHook.handler
  })
  return <form onSubmit={uiFormHook.submitHandler}>
    <Input
      label='email'
      input={{id: 'email', type: 'email', minLength: '1'}}
      value={emailInput}
      setValue={setEmailInput}
      validationHandler={emailValidationHandler}
      formActive={uiFormHook.active}
    />
    <Input
      label='password'
      input={{id: 'password', type: 'password', minLength: '1'}}
      value={passwordInput}
      setValue={setPasswordInput}
      validationHandler={passwordValidationHandler}
      formActive={uiFormHook.active}
    />
    <button type='submit'>
      submit
    </button>
    <button type='button' onClick={isCreatingHandler}>
      {isCreating ? 'login' : 'create'}
    </button>
  </form>
}
export default Component