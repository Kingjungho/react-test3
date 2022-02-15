import React, {
  useEffect,
  useState,
  useRef,
  useReducer,
  useContext,
} from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'
import LoginInput from '../UI/Input/LoginInput'

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'PASSWORD_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = () => {
  const ctx = useContext(AuthContext)
  // const [enteredEmail, setEnteredEmail] = useState('')
  // const [emailIsValid, setEmailIsValid] = useState()
  // const [enteredPassword, setEnteredPassword] = useState('')
  // const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  const [emailState, dispatchEamil] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  })

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)

    return () => {
      console.log('CLEAN UP')
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid])

  const emailRef = useRef()
  const passwordRef = useRef()

  const emailChangeHandler = event => {
    dispatchEamil({ type: 'USER_INPUT', val: event.target.value })

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // )
  }

  const passwordChangeHandler = event => {
    dispatchPassword({ type: 'PASSWORD_INPUT', val: event.target.value })

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
  }

  const validateEmailHandler = () => {
    dispatchEamil({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PASSWORD_BLUR' })
  }

  const submitHandler = event => {
    event.preventDefault()

    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value)
    } else if (!emailIsValid) {
      emailRef.current.activate()
    } else {
      passwordRef.current.activate()
    }
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <LoginInput
          type="email"
          ref={emailRef}
          className={classes.login}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}
        />
        <LoginInput
          type="password"
          ref={passwordRef}
          className={classes.login}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordState.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
