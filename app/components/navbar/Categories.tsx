"use client";

import Container from "../container/Container";
import { TbBeach } from "react-icons/tb";
import {GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach'
    },

    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'
    },
    {
        label: 'Countryside',
        icon: MdOutlineVilla,
        description: 'This property is in the countreyside'
    },
    {
        label: 'Pools',
        icon: MdOutlineVilla,
        description: 'This property has a pool'
    },
    {
        label: 'Islands',
        icon: MdOutlineVilla,
        description: 'This property is on an island'
    },
    {
        label: 'Lake',
        icon: MdOutlineVilla,
        description: 'This property has a lake!'
    },
    {
        label: 'Skiing',
        icon: MdOutlineVilla,
        description: 'This property has skiing activities'
    },
    {
        label: 'Castles',
        icon: MdOutlineVilla,
        description: 'This property is in a caste!'
    },
    {
        label: 'Camping',
        icon: MdOutlineVilla,
        description: 'This property has camping activities!'
    },
    {
        label: 'Arctic',
        icon: MdOutlineVilla,
        description: 'This property is in the arctic!'
    },
    {
        label: 'Cave',
        icon: MdOutlineVilla,
        description: 'This property has a cave!'
    },
    {
        label: 'Desert',
        icon: MdOutlineVilla,
        description: 'This property is in a dessert!'
    },
    {
        label: 'Barns',
        icon: MdOutlineVilla,
        description: 'This property is in a barn!'
    },
    {
        label: 'Lux',
        icon: MdOutlineVilla,
        description: 'This property is luxorious'
    }
]
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/';
    if (!isMainPage){
        return null;
    }
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-hidden">
                {categories.map((item) => 
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                        selected={category == item.label}
                    
                    />)}
            </div>
        </Container>
    )
}

export default Categories;