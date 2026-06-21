import './ErrorBox.css'

const ErrorBox = ({ children, error, style={} }) => {
    const errorBox = error === '' ? "error-box not-visible" : "error-box visible"

    return(
        <div className={errorBox} style={style}>
            <p>{ error }</p>
            {children}
        </div>
    )
}

export default ErrorBox