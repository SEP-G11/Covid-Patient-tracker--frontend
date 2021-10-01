import React from 'react'
import { Alert } from 'react-bootstrap'
import { ImWarning } from "react-icons/im";

const Warning = ({ variant, children }) => {
  return <Alert variant={variant} style={{color:"red"}}> <span class="icon"><ImWarning size={25} style={{ marginLeft: '4rem', marginRight: '.6rem' }}  /></span>WARNING : <strong>{children}</strong></Alert>
}

Warning.defaultProps = {
  variant: 'info',
}

export default Warning