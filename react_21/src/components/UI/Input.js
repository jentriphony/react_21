import useUiInput from './../../hooks/ui/input'
import Error from './Error'
const Component = props => {
  const {value, setValue, validationHandler, input, textarea, label, formActive} = props
  const uiInputHook = useUiInput({
    value,
    setValue,
    validationHandler,
    formActive
  })
  return <div>
    <label htmlFor={input ? input.id : textarea.id}>
      {label}
    </label>
    {input ? <input
      {...input}
      value={value.value}
      onBlur={uiInputHook.blurHandler}
      onInput={uiInputHook.inputHandler}
    /> : <textarea
      {...textarea}
      value={value.value}
      onBlur={uiInputHook.blurHandler}
      onInput={uiInputHook.inputHandler}
    />}
    {uiInputHook.showError && <Error message='error_input'/>}
  </div>
}
export default Component