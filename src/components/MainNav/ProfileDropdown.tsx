import { Fragment, useEffect } from "react";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar } from "flowbite-react";
import { FaBook, FaUser } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProfile } from "../../redux/book/profileSlice";

export default function ProfileDropdown() {
  const { data: profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

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
            <div className="flex gap-2 items-center">
              <div>
                <img src={profile?.profile_picture} width={"50px"} height={"50px"} className="object-cover rounded-full" alt="Profile Picture" />
              </div>
              <div>
                <span className="block text-sm font-bold">{profile?.fullname}</span>
                <span className="block truncate text-sm font-medium">
                  {profile?.email}
                </span>
              </div>
            </div>
          </DropdownHeader>
          <DropdownItem
            className="gap-2"
            onClick={() => navigate("/transactions")}
          >
            <FaMoneyCheckAlt /> My Transaction
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            className="gap-2"
            onClick={() => navigate("/collections")}
          >
            <FaBook /> My Book Collection
          </DropdownItem>
        </Dropdown>
      </Navbar.Link>
    </Fragment>
  );
}
