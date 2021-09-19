import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
  container?: Element
}

const Portal: React.FC<Props> = ({ children, container = document.body }) => {
  return ReactDOM.createPortal(children, container!)
}

export default Portal
