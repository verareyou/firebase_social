import React from 'react'

interface SearchProps {
    SearchShow: boolean,
}

const Search = ({
    SearchShow
}: SearchProps) => {

  return (
    <div
        style={{

        }}
        className={`flex items-center flex-row justify-center w-full h-full duration-100 ${SearchShow ? '' : ''}`}
    >
    </div>
  )
}

export default Search