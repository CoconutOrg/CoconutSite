import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import Input from './Input'
import LoadingOverlay from './LoadingOverlay'
import iconImg from './assets/coconut_icon.svg'
import './Login.css'
import { CredentialsContext } from './UserCredentials'

const Login = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [loadingHidden, setLoadingHidden] = useState(true)

    const [emailValue, setEmailValue] = useState('')
    const [emailError, setEmailError] = useState('')

    const [passwordValue, setPasswordValue] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [formError, setFormError] = useState('')

    const { login } = useContext(CredentialsContext)

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
        }
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

    const Login = async (e) => {
        let isValid = true;
        if (!onBlurEmail(emailValue)) {
            isValid = false;
        }
        if (!onBlurPassword(passwordValue)) {
            isValid = false;
        }
        if (!isValid) {
            return
        }
        if (import.meta.env.VITE_CONFIGURATION === 'mock') {
            setLoadingHidden(false)
            setTimeout(() => {
                setLoadingHidden(true)
                navigate('/app')
            }, 300)
        } else {
            setLoadingHidden(false)
            const response = await login(emailValue, passwordValue)
            setLoadingHidden(true)
            if (!response.ok) {
                console.log('Error logging in!')
                setFormError(t('login_error', 'Couldn\'t login!'))
                return
            }
            navigate('/app')
        }
    }

    const errorBox = formError === '' ? 'error-box not-visible' : 'error-box visible'

    return(
        <div className="login-body">
            <div className="login-container">
                <div className='login-icon-container'>
                    <img src={iconImg} alt='icon' />
                </div>
                <div className='login-main-container'>
                    <h1>{t('login_label', 'Login')}</h1>
                    <div className='login-input-container'>
                        <Input type="text" label={t('email_label', 'Email')}
                                value={emailValue} setValue={setEmailValue} error={emailError}
                                placeholder={t('email_placeholder', 'example@gmail.com')} maxLength="48"
                                onChange={(e, setValue) => { onChangeNotEmpty(e, setValue, setEmailError); onChangeEmail(e) }}
                                onBlur={(e, setValue) => { onBlurEmpty(e, setValue, setEmailError); onBlurEmail(e) }} defaultError="" />
                        <Input type="password" label={t('password_label', 'Password')}
                                value={passwordValue} setValue={setPasswordValue} error={passwordError}
                                placeholder={t('password_placeholder', 'Enter password...')} maxLength="48"
                                onChange={(e, setValue) => { onChangePassword(e) }}
                                onBlur={(e, setValue) => { onBlurPassword(e) }} defaultError="" />
                    </div>
                </div>
                <div className='login-footer-container'>
                    <button onClick={ Login }>{t('login_label', 'Login')}</button>
                    <div className={errorBox} style={{marginTop: `-10px`}}>
                        <p>{ formError }</p>
                    </div>
                    <a href='/register'>{t('login_register_button_label', 'Don\'t have an account? Create one!')}</a>
                </div>
            </div>
            <LoadingOverlay hidden={loadingHidden} />
        </div>
    )
}

export default Login