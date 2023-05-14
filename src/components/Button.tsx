import React from 'react'

const Button = ({
    text,
    onClick,
    isBlue,
    theme,
    disabled,
    style,
    tailw
}: any) => {
  return (
    <button
        disabled={disabled}
        onClick={onClick}
        style={{
            color: isBlue && 'white',
            border: isBlue ? 'none' : `1px solid ${theme.lightBorder}`,
            ...style
        }}
        className={` py-2 px-4 rounded-full hover:opacity-70 duration-100 outline-none 
        ${disabled ? 'opacity-50 cursor-not-allowed ' : 'cursor-pointer TouchableBlur'}
        ` + tailw}
    >
        {text ? text : 'Button'}
    </button>
  )
}

export default Button