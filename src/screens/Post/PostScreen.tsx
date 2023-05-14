import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FeedCard from '../Home/FeedCard'

const PostScreen = () => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const id = params.id
  const post = location.state.post
  const { theme, user } = useSelector((state: any) => state)

  return (
    <div
      style={{
        color: theme.text,
        backgroundColor: theme.background,
      }}
      className=' flex-1 min-h-screen items-center overflow-x-hidden justify-center md:pl-[100px] flex flex-col gap-2 p-4 '
    >
      <div className='flex flex-1 w-full flex-col items-center gap-2'>
        <div
          className=' flex-row md:flex hidden items-center gap-2'
        >
          <div>
            <img
              src={post.imageUrls[0]}
              alt='post image'
              className='w-full max-h-[600px] max-w-[600px] rounded-md'
            />
          </div>
          <div
            className='flex flex-col outline w-[] gap-2'
          >
            <div
              className='flex flex-row items-center gap-2'
            >
              <img
                src={post.user.profileImage}
                alt='profile image'
                className='w-10 h-10 object-cover rounded-full'
              />

              <div
                className='flex flex-col gap-1'
              >
                <div
                  className='flex flex-row items-center gap-2'
                >
                  <div
                    className='font-semibold'
                  >
                    {post.user.username}
                  </div>
                  <div
                    className='text-gray-500'
                  >
                    {post.user.name}
                  </div>
                  <div
                    className='text-gray-500'
                  >
                    {post.createdAt}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div
          className='flex outline w-full items-center justify-center flex-1 flex-col md:hidden gap-2'
        >
          <FeedCard
            post_Id={{id: post.uid, ...post}}
            Post={post}
            />
        </div>
      </div>
    </div>
  )
}

export default PostScreen