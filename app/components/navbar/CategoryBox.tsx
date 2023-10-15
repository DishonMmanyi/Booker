"use client"

import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from 'query-string';
interface CategoryBoxProps {
    key: string,
    label: string,
    description: string,
    icon: IconType
    selected?: boolean
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {

    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(() =>{
        let currentQuery = {};

        if(params){ //getting current query string in url
            currentQuery = qs.parse(params.toString());
        }
        //updating query string with category user clicked on
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }
        //if query string already has click on category, delete param
        if(params?.get('category') == label) {
            delete updatedQuery.category;
        }
        //creating url with updated query string
        const queryString = qs.stringify(updatedQuery, { skipNull: true });
        const url = `/?${queryString}`;
        //routing user to the the url
        router.push(url);
    }, [label, params, router])
    return (
        <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3  hover:text-neutral-800  transition cursor-pointer 
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
        `}>
            {Icon &&
                (
                <Icon size={24}/>
                )
            }
            
            <div className="font-medium text-sm">
                {label}
            </div>
            
        </div>
    )
}

export default CategoryBox;