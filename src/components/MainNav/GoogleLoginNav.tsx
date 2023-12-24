import { Fragment, useState } from "react";
import { Button, Divider, Modal } from "antd";
import { Navbar } from "flowbite-react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../../utils/error";
import { API } from "../../utils/api";
import { encryptData } from "../../utils/encrypt";
import { showToastError, showToastSuccess } from "../../utils/toast";
import { useCheckAccessToken } from "../../hooks/auth/useCheck";

export default function GoogleLoginNav() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { refetch: reCheckAccessToken } = useCheckAccessToken();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const loginGoogleSuccess = async (googleRes: CredentialResponse) => {
    try {
      const response = await API.post("/api/v1/customer/auth/google-auth", {
        tokenId: googleRes.credential,
      });

      // save refresh token & access token
      localStorage.setItem("refreshToken", encryptData(response.data.refreshToken));
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("accountType", encryptData("customer"));

      hideModal();
      showToastSuccess(response.data.message);
      reCheckAccessToken();
      navigate("/");
    } catch (error) {
      showToastError(getError(error));
    }
  };

  return (
    <Fragment>
      <Navbar.Link
        className="flex items-center cursor-pointer"
        onClick={showModal}
      >
        <span className="mr-1">
          <RiLoginBoxFill />
        </span>{" "}
        Login
      </Navbar.Link>
      <Modal
        title={<div className="text-lg">Login To Your Account</div>}
        open={isModalOpen}
        onCancel={hideModal}
        footer={
          <div className="flex justify-between items-center">
            <Link to={"/admin/login"}>
              <Button type="primary">Admin</Button>
            </Link>
            <Button danger onClick={hideModal}>
              Cancel
            </Button>
          </div>
        }
      >
        <Divider />
        <div className="my-5 flex justify-center">
          <GoogleLogin onSuccess={loginGoogleSuccess} />
        </div>
        <Divider />
      </Modal>
    </Fragment>
  );
}
