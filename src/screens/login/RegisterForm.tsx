import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, register } from '../../services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../../redux/Slice';
import { isEmailExists, isSameUsername } from '../../services/Validations';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isAuth} = useSelector((state: any) => state)

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

                if (res) {
                    navigate('/')
                }
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Formik
                initialValues={isLogin ? LoginInitialValues : SignInitialValues}
                validationSchema={isLogin ? LoginValidationSchema : SignupValidationSchema}
                onSubmit={onSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form className="max-w-md mx-auto text-white">

                        <h1 className="text-3xl font-bold mb-4">{isLogin ? "Login" : "Register"} {isAuth ? 'true' : 'false'} </h1>

                        <div className={' previewImage flex flex-col justify-center items-center ' +
                            (isLogin && 'hidden')
                        }>
                            <img
                                src={values.profileImage ? URL.createObjectURL(values.profileImage) : "https://via.placeholder.com/300"}
                                alt="profile"
                                className="rounded-full bg-transparent-full w-32 h-32 object-cover" />
                        </div>

                        <div className={`mb-4  ${isLogin && 'hidden'}`}>
                            <label htmlFor="profileImage" className="block text-gray-700 font-bold mb-2">Profile Image</label>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                className={`border rounded bg-transparent w-full py-2 px-3 ${touched.profileImage && errors.profileImage ? "border-red-500" : ""}`}
                                onChange={(event: any) => {
                                    setFieldValue("profileImage", event.currentTarget.files[0])
                                }}
                            ></input>
                            <ErrorMessage
                                component="div"
                                name="profileImage"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div className={`mb-4 ${isLogin && 'hidden'} `}>
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className={`border rounded bg-transparent w-full py-2 px-3 ${touched.name && errors.name ? "border-red-500" : ""}`}
                            />
                            <ErrorMessage
                                component="div"
                                name="name"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div className={`mb-4 ${isLogin && 'hidden'}`}>
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                onChange={async (event: any) => {
                                    setFieldValue("username", event.currentTarget.value.replace(/\s/g, ''))
                                    const res = await isSameUsername(event.currentTarget.value.replace(/\s/g, ''))
                                    SetInvalidUsername(res)
                                }}
                                className={`border rounded bg-transparent w-full py-2 px-3 ${touched.username && errors.username ? "border-red-500" : ""}`}
                            />
                            <ErrorMessage
                                component="div"
                                name="username"
                                className="text-red-500 text-sm mt-1"
                            />

                            <div className={` 
                            duration-300 ease-in-out transition-all
                            ${invalidUsername ? 'block' : 'hidden'}
                            `}>
                                <span className="text-red-500 text-sm mt-1">Username already taken</span>
                            </div>

                        </div>


                        <div className={`mb-4`}>
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                onChange={async (event: any) => {
                                    setFieldValue("email", event.currentTarget.value)
                                    if(isLogin) return
                                    const res = await isEmailExists(event.currentTarget.value)
                                    SetInvalidEmail(res)
                                }}
                                className={`border rounded bg-transparent w-full py-2 px-3 ${touched.email && errors.email ? "border-red-500" : ""}`}
                            />
                            <div className={` 
                            duration-300 ease-in-out transition-all
                            ${invalidEmail && !isLogin ? 'block' : 'hidden'}
                            `}>
                                <span className="text-red-500 text-sm mt-1">Email already exists</span>
                            </div>
                            <ErrorMessage component="div" name="email" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className={`mb-4`}>
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"

                                className={`border rounded bg-transparent w-full py-2 px-3 ${touched.password && errors.password ? "border-red-500" : ""}`} />
                            <ErrorMessage component="div" name="password" className="text-red-500 text-sm mt-1" />


                        </div>
                        <div className={`mb-4 ${isLogin && 'hidden'}`}>
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className={`border rounded bg-transparent w-full py-2 px-3 ${touched.confirmPassword && errors.confirmPassword ? "border-red-500" : ""}`}
                            />
                            <ErrorMessage
                                component="div"
                                name="confirmPassword"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>
                        <div className={`mb-4`}>
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
                            disabled={isLogin ? false : invalidUsername}
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isLogin ? "Login" : "Register"}
                        </button>
                    </Form>
                )}
            </Formik>






        </div>
    )
}

export default RegisterForm