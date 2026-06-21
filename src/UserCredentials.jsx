import { createContext, useState } from "react";

export const CredentialsContext = createContext(undefined)

const UserCredentials = ({ children }) => {
    const [authToken, setAuthToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')

    const login = async (email, password) => {
        const loginDto = {
            email: email,
            password: password
        }

        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDto)
        })
        if (!response.ok) {
            return response
        }

        const body = await response.json()

        setAuthToken(body.authToken)
        setRefreshToken(body.refreshToken)

        return response
    }

    const authorizedRequest = async (requestFunc) => {
        while (true) {
            const response = await requestFunc(authToken)
            if (response.status != 401) {
                return response
            }
            const responseRefresh = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/Auth/refresh`, {
                method: 'PUT',
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            })
            if (responseRefresh.ok) {
                const bodyRefresh = await responseRefresh.json()
                setAuthToken(bodyRefresh.authToken)
                continue
            }
            return responseRefresh
        }
    }

    return(
        <CredentialsContext.Provider value={{
            authToken: authToken,
            refreshToken: refreshToken,
            authorizedRequest: authorizedRequest,
            login: login,
        }}>
            {children}
        </CredentialsContext.Provider>
    )
}

export default UserCredentials