"use client";
import Image from "next/image";

interface avatarProps {
    src: string | null | undefined
}
const Avatar: React.FC<avatarProps> = ({src})=> {

    return (
        <Image 
            className="rounded-full"
            height="30"
            width="30"
            alt="avatar"
            src={src || "/images/avatar.jpg"}
        />
        

    )
}

export default Avatar;