import { Fragment, useState } from 'react'
import { Button, Divider, Modal } from 'antd';
import { Navbar } from 'flowbite-react'
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { RiLoginBoxFill } from 'react-icons/ri'

export default function GoogleLoginNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const loginGoogleSuccess = async (response: CredentialResponse) => {
    console.log(response);
  };

  return (
    <Fragment>
      <Navbar.Link className='flex items-center cursor-pointer' onClick={showModal}>
        <span className='mr-1'><RiLoginBoxFill /></span> Login
      </Navbar.Link>
      <Modal title={<div className='text-lg'>Login Using Google Account</div>} open={isModalOpen} onCancel={hideModal} footer={<Button danger onClick={hideModal}>Cancel</Button>}>
        <Divider />
        <div className='my-5 flex justify-center'>
          <GoogleLogin onSuccess={loginGoogleSuccess} />
        </div>
        <Divider />
      </Modal>
    </Fragment>
  )
}
