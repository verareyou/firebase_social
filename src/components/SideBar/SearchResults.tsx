import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface SearchResultsProps {
    user : any,
    onClick?: () => void
}

const SearchResults = ({
    user,
    onClick
}: SearchResultsProps) => {

    const { theme } = useSelector((state: any) => state)
    const navigate = useNavigate()

  return (
    <div
        style={{
            border: `1px solid ${theme.lightBorder}`,
            color: theme.text,
        }}
        className="flex items-center rounded-3xl justify-between w-full h-[50px] px-2"
    >
        <div
            onClick={onClick}
            className="flex items-center TouchableBlur w-full h-full"
        >
            <img
                className="object-cover w-8 h-8 rounded-full"
                src={user.profileImage}
                alt="profile"
            />
            <div
                className="flex flex-col ml-2"
            >
                <span
                    className="text-sm font-semibold"
                >
                    {user.username}
                </span>
                <span
                    className="text-xs text-gray-500"
                >
                    {user.name}
                </span>

                </div>

        </div>
    </div>
  )
}

export default SearchResults