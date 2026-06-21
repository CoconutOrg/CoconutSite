import { useState, useEffect } from 'react'
import './Input.css'
import './ErrorBox.css'

const Input = (props) => {
    const onChange = (e) => {
        props.setValue(e.target.value)
        if (props.type === "tel") {
            props.setValue(e.target.value.replace(/\D/g, ''))
        } else {
            props.setValue(e.target.value)
        }
        props.onChange(e.target.value)
    }

    const onBlur = (e) => {
        props.onBlur(e.target.value)
    }

    const onClick = (e) => {
        console.log("Clicked")
    }

    const borderColor = props.error === '' ? "" : " input-error"
    const errorBox = props.error === '' ? "error-box not-visible" : "error-box visible"

    return(
        <div>
            <div className={ props.type }>
                <label>{ props.label }</label>
                <input type={ props.type }
                        className={"text-input" + borderColor} 
                        name={ props.name } 
                        placeholder={ props.placeholder } 
                        value={ props.value } 
                        maxLength={ props.maxLength }
                        onChange={ onChange }
                        onBlur={ onBlur }
                        onClick={ onClick } />
            </div>
            <div className={errorBox} style={{marginTop: `-10px`}}>
                <p>{ props.error }</p>
            </div>
        </div>
    )
}

export default Input