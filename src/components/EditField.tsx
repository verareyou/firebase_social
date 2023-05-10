import React from 'react'
import { useSelector } from 'react-redux'

const EditField = ({
    placeholder,
    value,
    onChange,
    type,
}) => {
    const { theme } = useSelector((state: any) => state)
  return (
    <input
        value={value}
        onChange={onChange}
        style={{
            border: `1px solid ${theme.lightBorder}`,
            color: theme.text,
        }}
        className=' p-2 px-4 rounded-full outline-none text-black placeholder-gray-500'
        type={type}
        placeholder={placeholder}
    />
  )
}

export default EditField