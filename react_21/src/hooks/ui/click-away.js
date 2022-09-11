import {useState, useCallback, useEffect} from 'react'
const Hook = props => {
  const [visible, setVisible] = useState(null)
  const visibilityHandler = useCallback(() => setVisible(state => !state), [])
  const clickHandler = useCallback(callbackProps => {
    if(callbackProps.target.id && callbackProps.target.id.includes('immune-click-away-button')) return
    let parentNode = callbackProps.target.parentNode
    while(parentNode && parentNode.nodeName.toLowerCase() !== 'body') {
      if(parentNode.id && parentNode.id.includes('immune-click-away')) return
      parentNode = parentNode.parentNode
    }
    visibilityHandler()
  }, [visibilityHandler])
  useEffect(() => {
    visible ? document.body.addEventListener('click', clickHandler) : document.body.removeEventListener('click', clickHandler)
  }, [visible, clickHandler])
  return {visible, visibilityHandler}
}
export default Hook