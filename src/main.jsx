import { createContext, StrictMode, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UserCredentials from './UserCredentials.jsx'
import Login from './Login.jsx'
import './theme.css'
import './index.css'
import './i18n'
import Register from './Register.jsx'

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const Main = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return(
    <StrictMode>
      <UserCredentials>
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </UserCredentials>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(
  <Main />
)
