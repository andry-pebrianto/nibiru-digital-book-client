import { Button, Navbar } from "flowbite-react";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import AppLogo from "../../assets/logo.png";
import GoogleLoginNav from "./GoogleLoginNav";
import { decryptData } from "../../utils/encrypt";
import { useCheckAccessToken } from "../../hooks/useCheck";
import { showToastError } from "../../utils/toast";
import { API } from "../../utils/api";

export default function MainNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const { refetch: reCheckAccessToken } = useCheckAccessToken();

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Will Be Logged Out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        API.delete(
          "/api/v1/customer/auth/logout/" +
            decryptData(localStorage.getItem("refreshToken") || "")
        );
        localStorage.clear();
        reCheckAccessToken();
        navigate("/");
      }
    });
  };

  return (
    <Fragment>
      <Navbar className="mb-8 p-4 -mt-[1px]" fluid rounded border>
        <Navbar.Brand as={Link} to={"/"} className="lg:ml-10">
          <img
            src={AppLogo}
            className="mr-3 h-10 sm:h-9"
            alt="Nibiru Digital Book"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Nibiru Digital Book
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 lg:mr-10">
          {localStorage.getItem("refreshToken") ? (
            <>
              {decryptData(localStorage.getItem("accountType") || "") ===
              "customer" ? (
                <Link to={"/search"}>
                  <Button
                    className="mr-2 hidden sm:block"
                    gradientDuoTone="greenToBlue"
                  >
                    Discover New Book
                  </Button>
                </Link>
              ) : (
                <Button
                  className="mr-2 hidden sm:block"
                  gradientDuoTone="greenToBlue"
                >
                  Good Work Admin
                </Button>
              )}
            </>
          ) : (
            <Button
              className="mr-2 hidden sm:block"
              gradientDuoTone="greenToBlue"
              onClick={() => showToastError("Please Login First")}
            >
              Discover New Book
            </Button>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="lg:-ml-16">
          {/* guest & customer) */}
          {decryptData(localStorage.getItem("accountType") || "") !==
            "admin" && (
            <Navbar.Link
              as={Link}
              to={"/"}
              className="flex items-center"
              active={location.pathname === "/" ? true : false}
            >
              <span className="mr-1">
                <AiFillHome />
              </span>{" "}
              Home
            </Navbar.Link>
          )}
          {/* customer */}
          {localStorage.getItem("refreshToken") &&
            decryptData(localStorage.getItem("accountType") || "") ===
              "customer" && (
              <Navbar.Link
                as={Link}
                to={"/search"}
                className="flex items-center"
                active={location.pathname === "/search" ? true : false}
              >
                <span className="mr-1">
                  <FaSearch />
                </span>{" "}
                Search
              </Navbar.Link>
            )}
          {/* admin */}
          {localStorage.getItem("refreshToken") &&
            decryptData(localStorage.getItem("accountType") || "") ===
              "admin" && (
              <>
                <Navbar.Link
                  as={Link}
                  to={"/admin/book"}
                  className="flex items-center"
                  active={location.pathname === "/admin/book" ? true : false}
                >
                  <span className="mr-1">
                    <FaBook />
                  </span>{" "}
                  List Book
                </Navbar.Link>
                <Navbar.Link
                  as={Link}
                  to={"/admin/genre"}
                  className="flex items-center"
                  active={location.pathname === "/admin/genre" ? true : false}
                >
                  <span className="mr-1">
                    <MdCategory />
                  </span>{" "}
                  List Genre
                </Navbar.Link>
              </>
            )}
          {/* logout */}
          {localStorage.getItem("refreshToken") && (
            <Navbar.Link
              className="flex items-center cursor-pointer"
              onClick={logout}
            >
              <span className="mr-1">
                <RiLogoutBoxFill />
              </span>{" "}
              Logout
            </Navbar.Link>
          )}
          {!localStorage.getItem("refreshToken") && <GoogleLoginNav />}
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
}
