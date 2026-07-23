import { useState } from "react"
import { useLocation } from "react-router-dom"
import LoadingOverlay from "./LoadingOverlay"

const RegisterConfirm = () => {
    const location = useLocation()

    const registerDto = location.state

    const [loadingHidden, setLoadingHidden] = useState(true)

    const SendCode = async (e) => {
        e.preventDefault()
        if (import.meta.env.VITE_CONFIGURATION === 'mock') {
            setLoadingHidden(false)
            setTimeout(() => {
                setLoadingHidden(true)
                navigate('/')
            }, 300)
        } else {
            setLoadingHidden(false)
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerDto)
            })
            setLoadingHidden(true)
            if (!response.ok) {
                // error
                setFormError(t('register_error', 'Couldn\'t register!'))
                return
            }
            navigate('/register/confirmStatus', { state: registerDto })
        }
    }

    return(
        <div>
            <h1>One more step!</h1>
            <p>Email has been sent to {registerDto.email} for account verification. If you did not recieve the mail, <a href="" onClick={SendCode}>press this link to resend it</a></p>
            <LoadingOverlay hidden={loadingHidden} />
        </div>
    )
}

export default RegisterConfirm