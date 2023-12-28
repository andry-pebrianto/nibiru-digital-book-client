import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from "flowbite-react";
import { Fragment } from "react";
import { FaUser } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ProfileDropdown() {
  return (
    <Fragment>
      <Navbar.Link className="flex items-center cursor-pointer">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <>
              <span className="mr-1">
                <FaUser />
              </span>{" "}
              Profile
            </>
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <Link to={"/transactions"}>
            <DropdownItem className="gap-2">
              <FaMoneyCheckAlt /> My Transaction
            </DropdownItem>
          </Link>
          <DropdownDivider />
          <Link to={"/cart"}>
            <DropdownItem className="gap-2">
              <BsCartFill /> My Cart
            </DropdownItem>
          </Link>
        </Dropdown>
      </Navbar.Link>
    </Fragment>
  );
}
