import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FollowingCardMid from './FollowingCardMid'

const FollowingModel = ({
  toggle,
  type,
  ids,
}: any) => {

  console.log(ids)

  const { theme } = useSelector((state: any) => state)
  const [close, setClose] = useState<boolean>(false)
  const navigate = useNavigate()
  // console.log('hey')

  return (
    <div
      style={{
        backgroundColor: theme.blurBackground,
        color: theme.text,
        backdropFilter: 'blur(10px)',
      }}
      className="fixed FollowingModel top-0 left-0 gap-2 flex-col-reverse w-full z-[99999] h-screen flex items-center justify-center p-4 "
    >
      <style>
        {`
                .FollowingModel{
                    animation: ${close ? 'fadeOut' : 'fadeIn'} 0.3s ease-in-out;
                }
                `}
      </style>
      <div
        style={{
          backgroundColor: theme.secBackground,
          color: theme.text,
        }}
        className=" p-3 rounded-3xl"
        onClick={() => {
          setClose(true)
          setTimeout(() => {
            toggle(false)
            navigate(-1)
          }, 200);
        }
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke={theme.text}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

      </div>
      <div
        style={{
          backgroundColor: theme.secBackground,
          color: theme.text,
        }}
        className=" rounded-3xl p-4 md:p-8 w-full md:w-[350px] h-fit max-h-[80%] min-h-[400px] overflow-y-auto scrollbar-none "
      >
        <h1
          className="text-center text-xl font-semibold"
        >
          {type}
        </h1>
        <div
          className="flex flex-col gap-2 mt-4"
        >
          {ids && ids.map((id: any) => (
            <FollowingCardMid
              key={id}
              id={id}
            />
          ))}
          {!ids && <h1
            className="text-center text-xl font-semibold"
          >
            No {type}
          </h1>}

        </div>
      </div>
    </div>
  )
}

export default FollowingModel