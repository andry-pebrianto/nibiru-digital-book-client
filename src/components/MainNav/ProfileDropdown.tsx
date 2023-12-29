import { Fragment } from "react";
import { Dropdown, DropdownHeader, DropdownItem, Navbar } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const navigate = useNavigate();

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
          <DropdownItem
            className="gap-2"
            onClick={() => navigate("/transactions")}
          >
            <FaMoneyCheckAlt /> My Transaction
          </DropdownItem>
        </Dropdown>
      </Navbar.Link>
    </Fragment>
  );
}
