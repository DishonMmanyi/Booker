"use client";
import { ReactNode } from 'react';
import {useEffect, useState } from 'react';
interface ClientOnlyProps {
    children: ReactNode;
}
const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }

    , []);

    if(!hasMounted){
        return null;
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default ClientOnly;