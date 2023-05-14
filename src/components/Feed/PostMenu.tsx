import { useState } from "react"
import { useSelector } from "react-redux"


const PostMenu = () => {
    const { theme } = useSelector((state: any) => state)
    const [showMenu, setShowMenu] = useState(false)
  return (
    <div
        className='flex flex-col gap-2'
    >

    </div>
  )
}

export default PostMenu