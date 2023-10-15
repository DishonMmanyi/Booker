'use client';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import userRegisterModal from "../../hooks/userRegisterModal";
import userLoginModal from "../../hooks/userLoginModal";
import { useRouter } from 'next/navigation';
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../button/Button";
const LoginModal = () => {
    const router = useRouter();
    const loginModal = userLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        //calling nextAuth signin method using credentialsProvider
        signIn('credentials', {
            ...data,
            redirect: false,
        }) //callback has info on the success of the auth
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){ //if auth success
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose()
            }

            if(callback?.error){ //auth error
                toast.error(callback.error);
            }
        })

    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title="Welcome Back"
                subtitle='Sign in to your account!'
            />
            <Input 
                id='email'
                label='email'
                type='email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='password'
                label='password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )    

    const footerContent = (

        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {signIn("google")}}
            />
            <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {signIn("github")}}
            />

            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={loginModal.onClose} className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
            
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;