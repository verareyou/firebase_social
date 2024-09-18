import React from 'react'
import { useSelector } from 'react-redux'
import FeedMid from './FeedMid'

const Feed = ({ Posts, setPosts, toggle, setToggle }: any) => {
    const { theme } = useSelector((state: any) => state)


    return (
        <div
            style={{
                color: theme.text,
            }}
            className=' items-center max-md:flex-1  flex flex-col gap-2 '
        >

            <div className="form-control">
                <label className="label cursor-pointer  flex gap-4">
                    <span className="label-text">Sub's posts</span>
                    <input type="checkbox" className="toggle" 
                        onChange={() => setToggle((prev: boolean) => !prev)}
                        checked={toggle}
                    />
                </label>
            </div>

            <div className=' flex flex-col items-center gap-4 w-full max-md:mb-16 '>
                {Posts && Posts.map((post: any, index: any) => (
                    <FeedMid key={index} Post={post} setPosts={setPosts}
                    />
                ))}
            </div>

        </div>
    )
}

export default Feed