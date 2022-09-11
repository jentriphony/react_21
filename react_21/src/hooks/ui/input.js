import {useState, useCallback, useEffect} from 'react'
const Hook = props => {
  const {value, setValue, validationHandler, formActive} = props
  const [active, setActive] = useState(null)
  const blurHandler = useCallback(() => {
    !active && setActive(true)
    setValue(state => ({
      ...state,
      valid: validationHandler(value.value)
    }))
  }, [active, setValue, validationHandler, value])
  const inputHandler = useCallback(callbackProps => {
    if((active || formActive) && !value.valid) {
      setValue(state => ({
        ...state,
        value: callbackProps.target.value,
        valid: validationHandler(callbackProps.target.value)
      }))
      return
    }
    setValue(state => ({
      ...state,
      value: callbackProps.target.value,
    }))
  }, [active, formActive, value, setValue, validationHandler])
  const reset = useCallback(() => {
    setActive(false)
    setValue(state => ({
      ...state,
      value: '',
      valid: null
    }))
  }, [setValue])
  useEffect(() => {
    setValue(state => ({
      ...state,
      reset
    }))
  }, [setValue, reset])
  return {blurHandler, inputHandler, showError: (active || formActive) && !value.valid}
}
export default Hook