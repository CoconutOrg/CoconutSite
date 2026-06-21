import iconImg from './assets/coconut_icon.svg'
import { useTranslation } from 'react-i18next'
import Input from './Input'
import { useState } from 'react'
import './Login.css'
import LoadingOverlay from './LoadingOverlay'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [loadingHidden, setLoadingHidden] = useState(true)

    const [usernameValue, setUsernameValue] = useState('')
    const [usernameError, setUsernameError] = useState('')

    const [emailValue, setEmailValue] = useState('')
    const [emailError, setEmailError] = useState('')

    const [passwordValue, setPasswordValue] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [repeatPasswordValue, setRepeatPasswordValue] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')

    // value@value.value
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    // 10 characters, uppercase, symbols, numbers
    const passwordRegex = /^(?=[A-Z]|[a-z]?[^A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/

    const onChangeNotEmpty = (value, setValue, setError) => {
        if (value.length > 0) {
            setError("")
        }
    }

    const onBlurEmpty = (value, setValue, setError) => {
        if (value.length === 0) {
            setError(t("input_empty", "Input cannot be empty"))
            return false
        }
        return true
    }

    const onChangeEmail = (value) => {
        if (emailRegex.test(value)) {
            setEmailError('')
        }
    }

    const onBlurEmail = (value) => {
        if (!emailRegex.test(emailValue)) {
            setEmailError(t('input_email_error', 'Email format is incorrect!'))
            return false
        }
        return true
    }

    const onChangePassword = (value) => {
        if (passwordValue.length > 0 && passwordError === t('input_empty')) {
            setPasswordError('')
        }
        if (passwordRegex.test(value)) {
            setPasswordError('')
        }
    }

    const onBlurPassword = (value) => {
        if (passwordValue.length == 0) {
            setPasswordError(t("input_empty", "Input cannot be empty"))
            return false
        }
        if (!passwordRegex.test(value)) {
            setPasswordError(t('input_password_error', 'Password format is incorrect! Must have at least 10 characters, 1 symbol, 1 number, 1 uppercase letter'))
            return false
        }
        return true
    }

    const onChangeRepeatPassword = (value) => {
        if (value === passwordValue && repeatPasswordError === t('password_repeat_match_error', 'Passwords must match!')) {
            setRepeatPasswordError('')
        }
    }

    const onBlurRepeatPassword = (value) => {
        if (value != passwordValue) {
            setRepeatPasswordError(t('password_repeat_match_error', 'Passwords must match!'))
            return false
        }
        return true
    }

    const Register = async (e) => {
        let isValid = true
        if (!onBlurEmpty(usernameValue, setUsernameValue, setUsernameError)) {
            isValid = false
        }
        if (!onBlurEmail(emailValue)) {
            isValid = false
        }
        if (!onBlurPassword(passwordValue)) {
            isValid = false
        }
        if (!onBlurRepeatPassword(repeatPasswordValue) || !onBlurEmpty(repeatPasswordValue, setRepeatPasswordValue, setRepeatPasswordError)) {
            isValid = false
        }
        if (!isValid) {
            return
        }
        if (import.meta.env.VITE_CONFIGURATION === 'mock') {
            setLoadingHidden(false)
            setTimeout(() => {
                setLoadingHidden(true)
                navigate('/')
            }, 300)
        } else {
            const registerDto = {
                username: usernameValue,
                email: emailValue,
                password: passwordValue
            }
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerDto)
            })
            if (!response.ok) {
                // error
                return
            }
        }
    }

    return(
        <div className="login-body">
            <div className="login-container">
                <div className='login-icon-container'>
                    <img src={iconImg} alt='icon' />
                </div>
                <div className='login-main-container'>
                    <h1>{t('register_label', 'Register')}</h1>
                    <div className='login-input-container'>
                        <Input type="text" label={t('username_label', 'Username')}
                                value={usernameValue} setValue={setUsernameValue} error={usernameError}
                                placeholder={t('username_placeholder', 'Enter username...')} maxLength="48"
                                onChange={(e, setValue) => { onChangeNotEmpty(e, setValue, setUsernameError) }}
                                onBlur={(e, setValue) => { onBlurEmpty(e, setValue, setUsernameError) }} defaultError="" />
                        <Input type="text" label={t('email_label', 'Email')}
                                value={emailValue} setValue={setEmailValue} error={emailError}
                                placeholder={t('email_placeholder', 'example@gmail.com')} maxLength="48"
                                onChange={(e, setValue) => { onChangeNotEmpty(e, setValue, setEmailError); onChangeEmail(e) }}
                                onBlur={(e, setValue) => { onBlurEmpty(e, setValue, setEmailError); onBlurEmail(e) }} defaultError="" />
                        <Input type="password" label={t('password_label', 'Password')}
                                value={passwordValue} setValue={setPasswordValue} error={passwordError}
                                placeholder={t('password_placeholder', 'Enter password...')} maxLength="48"
                                onChange={(e, setValue) => onChangePassword(e) }
                                onBlur={(e, setValue) => onBlurPassword(e) } defaultError="" />
                        <Input type="password" label={t('password_repeat_label', 'Repeat password')}
                                value={repeatPasswordValue} setValue={setRepeatPasswordValue} error={repeatPasswordError}
                                placeholder={t('password_repeat_placeholder', 'Re-enter password...')} maxLength="48"
                                onChange={(e, setValue) => { onChangeNotEmpty(e, setValue, setRepeatPasswordError); onChangeRepeatPassword(e) }}
                                onBlur={(e, setValue) => { onBlurEmpty(e, setValue, setRepeatPasswordError); onBlurRepeatPassword(e) }} defaultError="" />
                    </div>
                </div>
                <div className='login-footer-container'>
                    <button onClick={ Register }>{t('register_label', 'Register')}</button>
                    <a href='/'>{t('register_login_button_label', 'Already have an account? Log in!')}</a>
                </div>
            </div>
            <LoadingOverlay hidden={loadingHidden} />
        </div>
    )
}

export default Register