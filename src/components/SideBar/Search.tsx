import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditField from '../EditField'
import { getAllUsers, getUserByUsername } from '../../services/User'
import SearchResults from './SearchResults'
import { useNavigate } from 'react-router-dom'

interface SearchProps {
  ShowSearch: boolean,
  setRoute?: any,
  isMobile?: boolean

}

const Search = ({
  ShowSearch,
  setRoute,
  isMobile
}: SearchProps) => {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([]) as any
  const [users, setUsers] = useState([]) as any
  const [searchLoading, setSearchLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const { theme } = useSelector((state: any) => state)

  const fetchUsers = async () => {
    const res = await getAllUsers()
    if (res) {
      setUsers(res)
      setSearchResults(res)
    } else {
      setUsers([])
    }
  }

  useEffect(() => {
    // if (ShowSearch) {
      fetchUsers()
    // }
  }, [ShowSearch])

  useEffect(() => {
    setTimeout(() => {
      setOpen(ShowSearch)
    }
      , 0)
  }, [ShowSearch])


  const handleSearch = async (e: any) => {
    if (e === '') {
      setSearchResults(users)
      return
    }
    setSearchLoading(true)
    const results = users.filter((user: any) => {
      return user.username.toLowerCase().includes(e.toLowerCase())
    })
    setSearchResults(results)
    setSearchLoading(false)
  }

  return (
    <div
      style={{
        background: isMobile ? theme.mode === 'dark' ? '#111111ee' : '#ffffff99'
                    : theme.background,
                    backdropFilter: isMobile ? 'blur(3px)' : 'blur(0px)',
        color: theme.text,
        borderRight: `1px solid ${theme.lightBorder}`,
        transform: open ?(isMobile ? 'translateY(0%)' : 'translateX(0%)') :( isMobile ? 'translateY(120%)' : 'translateX(-130%)'),
        filter: !open ? 'blur(30px)' : 'blur(0px)',
      }}
      className={`flex fixed flex-col justify-center z-[9999] md:w-[300px] w-full h-full duration-200 md:left-[100px] ${isMobile ? '' : ''}`}
    >
      <div
        style={{
          borderBottom: `1px solid ${theme.lightBorder}`,
        }}
        className={`flex flex-col  h-fit py-4 px-4 gap-4 justify-center w-full`}
      >
        <h1
          className={` text-xl font-bold`}
        >
          Search
        </h1>
        <EditField
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value)
            handleSearch(e.target.value)
          }
          }
          placeholder="Search"
          type="text"
          tailw="w-full"
        />
      </div>

      <div
        className={`flex flex-col h-full w-full gap-2 p-2 overflow-y-auto`}
      >
        <h1
          className={`text-sm font-semibold ml-2 my-1`}
        >
          {searchResults.length === users.length ? 'All Users' : 'Search Results'}
        </h1>
        {users.length > 0 && searchResults.map((user: any) => (
          <SearchResults
            key={user.uid}
            user={user}
            onClick={() => {
              navigate(`/${user.username}`)
              setRoute()
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Search