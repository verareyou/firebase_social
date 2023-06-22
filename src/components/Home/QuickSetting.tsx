import React from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Items = ({title, onClick, invert}: any) => {
    const { theme } = useSelector((state: any) => state)
  return (
    <button
        onClick={onClick}
        style={{
            border: `1px solid ${theme.lightBorder}`,
            backgroundColor: theme.background,
            filter: invert ? 'invert(1)' : 'invert(0)',
        }}
        className='flex items-center justify-center w-full rounded-full duration-100 h-full text-sm font-semibold cursor-pointer'
    >
        {title}
    </button>
  )
}

const QuickSetting = ({visible, }: any) => {

    const {theme} = useSelector((state: any) => state)
    const [confirm, setConfirm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (confirm) {
            setTimeout(() => {
                setConfirm(false)
            }, 2000)
        }
    }, [confirm])

  return (
    <div
        style={{
            height: visible ? '164px' : '0px',
        }}
        className='flex flex-col gap-2 duration-300 overflow-hidden z-[0] ease-in-out rounded-[20px] '
    >
        <div
            className='flex flex-col gap-2 min-h-[164px] outline '
        >
            <Items
                title='account'
                onClick={() => console.log('Settings')}
            />
            <Items
                invert={confirm}
                title={confirm ? 'Confirm' : 'Logout'}
                onClick={async () => {
                    if (confirm) {
                        await logout()
                    } else {
                        setConfirm(true)
                    }
                    // await logout()
                }}
            />
            <Items
                title='Settings'
                onClick={() => navigate('/accounts/settings')}
            />
        </div>
    </div>
  )
}

export default QuickSetting