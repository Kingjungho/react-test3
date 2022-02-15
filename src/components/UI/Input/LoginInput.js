import styles from './LoginInput.module.css'
import React, { useRef, useImperativeHandle } from 'react'

const LoginInput = React.forwardRef(
  ({ type, value, onChange, onBlur, isValid }, ref) => {
    const inputRef = useRef()

    const activate = () => {
      inputRef.current.focus()
    }

    useImperativeHandle(ref, () => {
      return {
        activate: activate,
      }
    })

    return (
      <div
        className={`${styles.control} ${
          isValid === false ? styles.invalid : ''
        }`}
      >
        <label htmlFor={type}>{type === 'email' ? 'E-mail' : 'password'}</label>
        <input
          ref={inputRef}
          type={type}
          id={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    )
  }
)

export default LoginInput
