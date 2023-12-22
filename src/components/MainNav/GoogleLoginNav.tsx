import { Fragment, useState } from 'react'
import { Button, Divider, Modal } from 'antd';
import { Navbar } from 'flowbite-react'
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { RiLoginBoxFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';

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
      <Modal title={<div className='text-lg'>Login To Your Account</div>} open={isModalOpen} onCancel={hideModal} footer={
        <div className='flex justify-between items-center'>
          <Link to={"/admin/login"}><Button type='primary'>Admin</Button></Link>
          <Button danger onClick={hideModal}>Cancel</Button>
        </div>}>
        <Divider />
        <div className='my-5 flex justify-center'>
          <GoogleLogin onSuccess={loginGoogleSuccess} />
        </div>
        <Divider />
      </Modal>
    </Fragment>
  )
}