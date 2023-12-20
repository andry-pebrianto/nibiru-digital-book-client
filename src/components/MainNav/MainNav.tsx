import { Button, Navbar } from 'flowbite-react'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";

export default function MainNav() {
  const location = useLocation();

  return (
    <Fragment>
      <Navbar className='fixed w-full' fluid rounded border>
        <Link to={"/"}>
          <Navbar.Brand className='lg:ml-10'>
            <img src="/src/assets/logo.png" className="mr-3 h-10 sm:h-9" alt="Nibiru Digital Book" />
            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">Nibiru Digital Book</span>
          </Navbar.Brand>
        </Link>
        <div className="flex md:order-2 lg:mr-10">
          <Link to={"/search"}>
            <Button className='mr-2 hidden sm:block'>Discover New Product</Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className='-ml-10'>
          <Link to={"/"}>
            <Navbar.Link className='flex items-center' active={location.pathname === "/" ? true : false}>
              <span className='mr-1'><AiFillHome /></span> Home
            </Navbar.Link>
          </Link>
          <Link to={"/search"}>
            <Navbar.Link className='flex items-center' active={location.pathname === "/search" ? true : false}>
              <span className='mr-1'><FaSearch /></span> Search
            </Navbar.Link>
          </Link>
          <Link to={"/cart"}>
            <Navbar.Link className='flex items-center' active={location.pathname === "/cart" ? true : false}>
              <span className='mr-1'><FaShoppingCart /></span> Cart
            </Navbar.Link>
          </Link>
          <Link to={"/login"}>
            <Navbar.Link className='flex items-center' active={location.pathname === "/login" ? true : false}>
              <span className='mr-1'><RiLoginBoxFill /></span> Login
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <div className='mb-12'>.</div>
    </Fragment>
  )
}
