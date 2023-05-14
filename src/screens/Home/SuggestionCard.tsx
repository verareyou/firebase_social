import { useSelector } from "react-redux"
import { motion } from "framer-motion"

const SuggestionCard = () => {
    const {theme, user} = useSelector((state: any) => state)

    const motionVariants = {
        initial: {
            opacity: 0,
            translateX: '100%',
        },
        animate: {
            opacity: 1,
            translateX: 0,
        },
        exit: {
            opacity: 0,
            translateX: '100%',
        }
    }
  return (
    <motion.div
    {...motionVariants}
    transition={{duration: 0.5}}
    className=' flex-col items-center justify-center md:flex hidden gap-2 p-4 '
    style={{
        backgroundColor: theme.insecBackground,
        color: theme.text,
    }}
    >

    </motion.div>
  )
}

export default SuggestionCard