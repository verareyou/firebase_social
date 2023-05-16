import React from 'react'
import { useSelector } from 'react-redux'

const EditField = ({
    placeholder,
    value,
    onChange,
    type,
    style,
    tailw,
    textArea
}: any) => {
    const { theme } = useSelector((state: any) => state)
  return (
    !textArea ?
    <input
        value={value}
        onChange={onChange}
        style={{
            border: `1px solid ${theme.lightBorder}`,
            color: theme.text,
            ...style
        }}
        className={` p-2 px-4 w-full rounded-full bg-transparent outline-none duration-100 text-black placeholder-[#a7a7a7] ${tailw} `}
        type={type}
        placeholder={placeholder}
    /> 
    :
    <textarea
        maxLength={50}
        value={value}
        onChange={onChange}
        style={{
            border: `1px solid ${theme.lightBorder}`,
            color: theme.text,
            ...style
        }}
        className={` p-2 px-4 rounded-3xl min-h-fit bg-transparent outline-none duration-100 text-black placeholder-[#a7a7a7] ${tailw} `}
        placeholder={placeholder}
    />
  )
}

export default EditField