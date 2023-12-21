import { Button, Navbar } from 'flowbite-react'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import AppLogo from "../../assets/logo.png"
import GoogleLoginNav from './GoogleLoginNav';

export default function MainNav() {
  const location = useLocation();

  return (
    <Fragment>
      <Navbar className='mb-8 p-4 -mt-[1px]' fluid rounded border>
        <Navbar.Brand as={Link} to={"/"} className='lg:ml-10'>
          <img src={AppLogo} className="mr-3 h-10 sm:h-9" alt="Nibiru Digital Book" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Nibiru Digital Book</span>
        </Navbar.Brand>
        <div className="flex md:order-2 lg:mr-10">
          <Link to={"/search"}>
            <Button className='mr-2 hidden sm:block' gradientDuoTone="greenToBlue">Discover New Book</Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className='lg:-ml-16'>
          <Navbar.Link as={Link} to={"/"} className='flex items-center' active={location.pathname === "/" ? true : false}>
            <span className='mr-1'><AiFillHome /></span> Home
          </Navbar.Link>
          <Navbar.Link as={Link} to={"/search"} className='flex items-center' active={location.pathname === "/search" ? true : false}>
            <span className='mr-1'><FaSearch /></span> Search
          </Navbar.Link>
          <GoogleLoginNav />
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  )
}
