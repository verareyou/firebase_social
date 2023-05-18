
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dotmenu, like, likeFilled, msg } from '../../assets/Icons'
import CommentCard from '../../components/Feed/CommentCard'
import LoadingCard from '../../components/Feed/LoadingCard'
import EditField from '../../components/EditField'
import { Button, ProfileView } from '../../components'
import CommentList from '../../components/Feed/CommentList'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import FeedMenu from '../../components/Feed/FeedMenu'

const FeedCard = ({
    isCurrentUser,
    post,
    liked,
    showPost,
    openComment,
    setOpenComment,
    fullCaption,
    setFullCaption,
    loading,
    handlePostLike,
    handleComment,
    comment,
    setComment,
    Follow,
    following,
    setEditCaption,
    deletePost,
}: any) => {

    const { theme, user } = useSelector((state: any) => state)
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth < 800) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [])

    const ref = useRef(null as any)

    const [visible, setVisible] = useState({
        visible: false,
        pos: {
            x: 0,
            y: 0
        }
    })

    return (
        <div
            style={{
                color: theme.text,
            }}
            className='flex relative flex-col gap-2 justify-between items-center overflow-clip rounded-3xl aspect-[4/5] max-sm:w-full max-sm:min-w-[300px] max-md:min-w-[400px] md:min-w-[400px] md:h-[500px]'
        >
            {/* menu */}

            {openMenu && <FeedMenu
                user={post.user}
                Follow={Follow}
                isCurrentUser={isCurrentUser}
                visible={openMenu}
                setVisible={setOpenMenu}
                deletePost={deletePost}
                post={post}
                setEditCaption={setEditCaption}
                following={following}
            />}

            {/* profile view */}

            { !isMobile && showPost &&
                <ProfileView
                    username={post.user.username}
                    showPost={showPost}
                    visible={visible}
                    setVisible={setVisible}
                />
            }

            <LoadingCard
                loading={loading}
            />
            <div
                style={{
                    backgroundColor: '#111111aa',
                }}
                className='flex backdrop-blur-[2px] z-[1] right-2 gap-4 flex-row items-center rounded-full justify-between h-[44px] px-1.5 mt-2 mx-2'
            >
                <div
                className='flex flex-row items-center gap-1 TouchableBlur'
                >
                <img
                    src={showPost && post.user.profileImage}
                    alt="profile"
                    className={'w-8 h-8 rounded-full duration-500 object-cover' + (showPost ? '' : ' blur-[50px]')}
                    />

                <h1
                    onMouseEnter={(e) => {
                        setVisible({
                            visible: true,
                            pos: {
                                x: e.clientX,
                                y: e.clientY
                            }
                        })
                    }}
                    onMouseLeave={() => {
                        setVisible({
                            ...visible,
                            visible: false,
                        })
                    }}
                // ref={ref}
                onClick={() => navigate(`/${post.user.username}`)}
                    className='ml-2 font-semibold text-white'
                >
                    {showPost && post.user.username}
                </h1>
            </div>
            <div
                className=' TouchableBlur pr-2'
                onClick={() => {
                    setOpenMenu(!openMenu)
                }}
            >
                <img
                    src={dotmenu}
                    alt=""
                    className='w-6 h-6 invert'
                />
            </div>
        </div>

            {/* post image */ }
            <img
                loading={'lazy'}
                src={showPost&& post.imageUrls[0]}
                alt="image"
                className={' object-cover duration-500 absolute h-full w-full z-0 ' + (!showPost && 'invert blur-[5px] opacity-10')}
            />

            <div
                style={{
                    backgroundColor: openComment ? '#171717ee' : 'transparent',
                    // color: theme.background,
                    height: openComment ? '90%' : '62px',
                    transform: openComment ? 'translateY(-99%)' : 'translateY(-62px)',
                    overflowY: openComment ? 'auto' : 'hidden',
                }}
                className='flex flex-col absolute duration-200 ease-in-out top-[100%] left-0 right-0 z-[99] backdrop-blur-[2px] overflow-y-auto overflow-x-hidden rounded-[28px] w-full gap-2 p-2 scrollbar scrollbar-thumb-[#b8c2d073] scrollbar-track-[transparent] scrollbar-h-2 scrollbar-w-1 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'
            >
                <CommentCard
                    liked={liked}
                    onLike={handlePostLike}
                    onComment={() => setOpenComment(!openComment)}
                    post={post}
                    showPost={showPost}
                    fullCaption={fullCaption}
                    openComment={openComment}
                    setOpenComment={setOpenComment}
                    setFullCaption={setFullCaption}
                />
                <div
                    className='flex flex-row items-center gap-2'
                >
                    <EditField
                        type='text'
                        style={{
                            color: 'white',
                            border: '1px solid #b8c2d073'
                        }}
                        placeholder='Add a comment...'
                        tailw=' h-12 '
                        value={comment}
                        onChange={(e: any) => setComment(e.target.value)}

                    />
                    <Button
                        theme={theme}
                        style={{
                            color: 'white',
                            border: '1px solid #b8c2d073'
                        }}
                        onClick={() => handleComment()}
                        text='Post'
                        tailw=' h-12 w-20'
                        disabled={comment.length < 1}
                    />
                </div>
                {showPost && openComment && post.comments.length > 0 &&
                    <CommentList
                        post={post.comments}
                    />
                }

            </div>
        </div >
    )
}

export default FeedCard
