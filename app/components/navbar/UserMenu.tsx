"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
import MenuItem from "./MenuItem";
import { useState, useCallback } from "react";
import userRegisterModal from "../../hooks/userRegisterModal";
import userLoginModal from "../../hooks/userLoginModal";
import { SafeUser } from "@/app/types";
import { register } from "module";
import { signOut } from "next-auth/react";

interface userMenuProps {
    currentUser: SafeUser | null;
}

const UserMenu: React.FC<userMenuProps> = ({currentUser}) => {
    const[isOpen, setIsOpen] = useState(false);
    const registerModal = userRegisterModal();
    const loginModal = userLoginModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3 ">
                <div onClick={()=>{}} className=" text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Booker your home
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer"> 
                    {currentUser ? (
                        <>
                        <MenuItem 
                            onClick={()=>{}}
                            label="My trips"
                        />
                        <MenuItem 
                            onClick={()=>{}}
                            label="My favorites"
                        />

                        <MenuItem 
                            onClick={()=>{}}
                            label="My reservations"
                        />
                        <MenuItem 
                            onClick={()=>{}}
                            label="My properties"
                        />
                        <MenuItem 
                            onClick={()=>{}}
                            label="Booker my home"
                        />
                        <MenuItem 
                            onClick={()=>{signOut()}}
                            label="Logout"
                        />
                    </>

                     ) : (
                    
                    
                        <>
                        <MenuItem 
                            onClick={()=>{loginModal.onOpen()}}
                            label="Login"
                        />
                        <MenuItem 
                            onClick={()=>{registerModal.onOpen()}}
                            label="SignUp"
                        />
                    </>
                    
                    )}

                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default UserMenu;