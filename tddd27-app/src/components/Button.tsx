import React from 'react'
import './Button.css'

const STYLES = ['btn--primary', 'btn--outline']
const SIZES = ['btn--medium', 'btn--large'];

interface Props {
    children: string,
    onClick: () => void,
    buttonStyle: string,
    buttonSize: string
}

function Button({children, onClick, buttonStyle, buttonSize}: Props) {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
