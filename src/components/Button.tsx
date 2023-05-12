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
            color: isBlue ? 'white' : theme.text,
            border: isBlue ? 'none' : `1px solid ${theme.lightBorder}`,
            ...style
        }}
        className={` py-2 px-4 TouchableBlur
        TouchableBlur rounded-full hover:opacity-70 duration-100 outline-none ${tailw} `}
    >
        {text}
    </button>
  )
}

export default Button