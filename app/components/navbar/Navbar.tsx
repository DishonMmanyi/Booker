import Container from "../container/Container";
import Search from "./Search";
import Logo from './Logo';
import UserMenu from './UserMenu';
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
interface navbarProps {
    currentUser: SafeUser | null;
}
const Navbar: React.FC<navbarProps> = ({currentUser}) => {


    return (
        <div className="fixed w-full big-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu currentUser = {currentUser}/>
                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
    )
}

export default Navbar;