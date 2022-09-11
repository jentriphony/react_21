import {createContext} from 'react'
const Context = createContext()
export const Provider = props => {
  const handler = async handlerProps => {
    handlerProps.onStart && handlerProps.onStart()
    try {
      const response = await fetch(handlerProps.url, handlerProps.configuration)
      if(!response.ok) throw response
      let data = await response.json()
      if(handlerProps.dataTail) {
        const dataTailArray = handlerProps.dataTail.split('.')
        for(let iterator = 0; iterator < dataTailArray.length; ++iterator)
          data = data[dataTailArray[iterator]]
      }
      handlerProps.onSuccess && handlerProps.onSuccess({data})
      handlerProps.onFinish && handlerProps.onFinish({data})
      return {data}
    } catch(response) {
      const error = (await response.json()).error
      handlerProps.onError && handlerProps.onError({errorMessage: error.message})
      handlerProps.onFinish && handlerProps.onFinish({errorMessage: error.message})
      return {errorMessage: error.message}
    }
  }
  return <Context.Provider value={{handler}}>
    {props.children}
  </Context.Provider>
}
export default Context