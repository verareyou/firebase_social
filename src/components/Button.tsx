import React from 'react'

const Button = ({
    text,
    onClick,
    isBlue,
    theme
}: any) => {
  return (
    <button
        onClick={onClick}
        style={{
            backgroundColor: isBlue ? '#0095f6' : 'transparent',
            color: isBlue ? 'white' : theme.text,
            border: isBlue ? 'none' : `1px solid ${theme.lightBorder}`,
        }}
        className=' py-2 px-4 rounded-full outline-none text-black '
    >
        {text}
    </button>
  )
}

export default Button