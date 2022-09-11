import {useState, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {fetchAction as pagesAuthSliceFetchAction} from './../../redux/pages/auth/auth'
import usePagesFetch from './../../hooks/pages/fetch'
import useUiForm from './../../hooks/ui/form'
import Input from './../UI/Input'
const Component = props => {
  const [passwordInput, setPasswordInput] = useState({value: '', valid: null})
  const passwordValidationHandler = useCallback(callbackProps => callbackProps.trim() !== '', [])
  const pagesPathsSlice = useSelector(store => store.pagesPaths)
  const pagesAuthSlice = useSelector(store => store.pagesAuth)
  const routerNavigateHook = useNavigate()
  const pagesFetchHookOnSuccess = useCallback(() => routerNavigateHook(pagesPathsSlice.home.home), [routerNavigateHook, pagesPathsSlice])
  const pagesFetchHook = usePagesFetch({
    sliceFetchAction: pagesAuthSliceFetchAction,
    urlTail: 'resetPassword',
    onSuccess: pagesFetchHookOnSuccess,
    configuration: {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        idToken: pagesAuthSlice.data.idToken,
        password: passwordInput.value,
        returnSecureToken: true
      })
    },
    actionName: 'set',
    actionSliceTail: 'data',
    sliceTail: 'pagesProfile'
  })
  const uiFormHook = useUiForm({inputs: [passwordInput], onSubmit: pagesFetchHook.handler})
  return <form onSubmit={uiFormHook.submitHandler}>
    <Input
      label='new password'
      input={{id: 'password', type: 'password', minLength: '1'}}
      value={passwordInput}
      setValue={setPasswordInput}
      validationHandler={passwordValidationHandler}
      formActive={uiFormHook.active}
    />
    <button type='submit'>
      submit
    </button>
  </form>
}
export default Component