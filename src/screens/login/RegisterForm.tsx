import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, register } from '../../services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { isEmailExists, isSameUsername } from '../../services/Validations';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import userpng from '../../assets/Icons/user.png';
import { CompressImage } from '../../utils/Operations';

const RegisterForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuth, theme } = useSelector((state: any) => state)

    const [loading, setLoading] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [invalidUsername, SetInvalidUsername] = useState(false)
    const [invalidEmail, SetInvalidEmail] = useState(false)

    const SignInitialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null,
    }

    const SignupValidationSchema = Yup.object({
        name: Yup.string().required('Required'),
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required('Required'),
        profileImage: Yup.mixed().required('Required'),
    })

    const LoginValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    })

    const LoginInitialValues = {
        email: '',
        password: '',
    }

    useEffect(() => {
        isAuth && navigate('/')
    }, [isAuth])

    const onSubmit = async (values: any) => {
        try {
            if (isLogin) {
                const res = await login({
                    email: values.email,
                    password: values.password
                })
                console.log(res)

                if (res) {
                    navigate('/')
                }
            } else {
                const res = await register({
                    name: values.name,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    image: values.profileImage
                })

                setIsLogin(true)

                // if (res) {
                //     navigate('/')
                // }
            }


        } catch (error) {
            console.log(error)
        }
    }

    const motionProps = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: isLogin ? 0 : 1,
            height: isLogin ? 0 : 'auto',
            display: isLogin ? 'none' : '',
        },
        transition: {
            duration: 0.2,
        },
    }

    return (
        <div>

            <style>
                {`
                .fields:focus {
                    border-color: ${theme.text};
                }
                .fields::placeholder {
                    color: ${theme.lightText};
                }
                .fields {
                    color: ${theme.text};
                    border: 1px solid #${theme.lightBorder.split('#')[1]}};
                    border-color: ${theme.text};

                }
                .fields:-webkit-autofill,
                .fields:-webkit-autofill:hover,
                .fields:-webkit-autofill:focus,
                .fields:-webkit-autofill:active  {
                    -webkit-box-shadow: 0 0 0 30px ${theme.background} inset !important;
                }
                
                `}
            </style>

            <Formik
                initialValues={isLogin ? LoginInitialValues : SignInitialValues}
                validationSchema={isLogin ? LoginValidationSchema : SignupValidationSchema}
                onSubmit={onSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form className="max-w-md mx-auto flex w-[300px] duration-300 flex-col gap-4">
                        <h1 className="text-3xl font-bold ">{isLogin ? "Login" : "Register"} </h1>

                        { isAuth && <h1 className="text-3xl font-bold ">Already Logged In</h1>}

                        <motion.div
                            {...motionProps}
                            className={' previewImage flex flex-col justify-center items-center '
                                // + (isLogin && 'hidden')
                            }>
                            <img
                                src={values.profileImage ? URL.createObjectURL(values.profileImage) : userpng}
                                alt="profile"
                                className={` bg-transparent-full object-cover my-4 ${theme.mode === 'dark' && !values.profileImage && 'invert'} ${values.profileImage ? 'rounded-full h-32 w-32' : ' h-20 w-20'}  `}
                            />
                        </motion.div>

                        <motion.div
                            {...motionProps}
                            className={` duration-300 flex`}>
                            <input
                                // select only image files
                                type="file"
                                accept="image/*"
                                placeholder='Profile'
                                id="profileImage"
                                name="profileImage"
                                className={` fields rounded-md outline-none bg-transparent w-full py-2 px-3 
                                before:content-none
                                ${touched.profileImage && errors.profileImage ? "border-red-500" : ""}`}
                                onChange={(event: any) => {
                                    setFieldValue("profileImage", event.currentTarget.files[0])
                                }}
                            ></input>
                            <ErrorMessage
                                component="div"
                                name="profileImage"
                                className="text-red-500 text-sm mt-1"
                            />
                        </motion.div>

                        <motion.div 
                        {...motionProps}
                        className={` `}>
                            <Field
                                type="text"
                                placeholder='Full Name'
                                id="name"
                                name="name"
                                className={` fields rounded-md outline-none bg-transparent w-full py-2 px-3 ${touched.name && errors.name ? "border-red-500" : ""}`}
                            />
                            <ErrorMessage
                                component="div"
                                name="name"
                                className="text-red-500 text-sm mt-1"
                            />
                        </motion.div>

                        <motion.div
                        {...motionProps}
                        className={``}>
                            <input
                                type="text"
                                placeholder='Username'
                                id="username"
                                name="username"
                                onChange={async (event: any) => {
                                    setFieldValue("username", event.currentTarget.value)
                                    const res = await isSameUsername(event.currentTarget.value)
                                    SetInvalidUsername(res)
                                }}
                                className={` fields border-1 rounded-md outline-none bg-transparent w-full py-2 px-3 ${touched.username && errors.username ? "border-red-500" : ""}`}
                            />
                            <ErrorMessage
                                component="div"
                                name="username"
                                className="text-red-500 text-sm mt-1"
                            />

                            <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: invalidUsername ? 1 : 0 }}
                            className={` 
                            duration-500 ease-in-out transition-all
                            ${invalidUsername ? 'h-fit' : 'h-0'}
                            `}
                            >
                                <span className="text-red-500 text-sm mt-1">Username already taken</span>
                            </motion.div>

                        </motion.div>


                        <div className={``}>
                            <Field
                                type="email"
                                placeholder='Email'
                                id="email"
                                name="email"
                                onChange={async (event: any) => {
                                    setFieldValue("email", event.currentTarget.value)
                                    if (isLogin) return
                                    const res = await isEmailExists(event.currentTarget.value)
                                    SetInvalidEmail(res)
                                }}
                                className={` fields rounded-md outline-none bg-transparent w-full py-2 px-3 ${touched.email && errors.email ? "border-red-500" : ""}`}
                            />
                            <div className={` 
                            duration-300 ease-in-out transition-all
                            ${invalidEmail && !isLogin ? 'block' : 'hidden'}
                            `}>
                                <span className="text-red-500 text-sm mt-1">Email already exists</span>
                            </div>
                            <ErrorMessage component="div" name="email" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className={``}>
                            <Field
                                type="password"
                                placeholder='Password'
                                id="password"
                                name="password"

                                className={` fields rounded-md outline-none bg-transparent w-full py-2 px-3 ${touched.password && errors.password ? "border-red-500" : ""}`} />
                            <ErrorMessage component="div" name="password" className="text-red-500 text-sm mt-1" />


                        </div>
                        <motion.div 
                        {...motionProps}
                         className={``}>
                            <Field
                                type="password"
                                placeholder='Confirm Password'
                                id="confirmPassword"
                                name="confirmPassword"
                                className={` fields rounded-md outline-none bg-transparent w-full py-2 px-3 ${touched.confirmPassword && errors.confirmPassword ? "border-red-500" : ""}`}
                            />
                            <ErrorMessage
                                component="div"
                                name="confirmPassword"
                                className="text-red-500 text-sm mt-1"
                            />
                        </motion.div>
                        <div className={``}>
                            <h1>
                                <span className="mr-2">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                                <span
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-blue-500 cursor-pointer hover:text-blue-700">
                                    {isLogin ? "Register" : "Login"}
                                </span>
                            </h1>
                        </div>
                        <button
                            disabled={isLogin ? false : invalidUsername || invalidEmail}
                            type="submit"
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" + (isLogin ? "" : " disabled:opacity-50")}
                        >
                            {isLogin ? "Login" : "Register"}
                        </button>
                    </Form>
                )}
            </Formik>






        </div>
    )
}

export default RegisterForm