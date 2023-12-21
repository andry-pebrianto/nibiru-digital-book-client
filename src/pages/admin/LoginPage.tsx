import { Button, Card, Label, TextInput } from 'flowbite-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

export default function LoginPage() {
  return (
    <Fragment>
      <div className='max-w-xl mx-6 sm:mx-auto'>
        <h1 className='mt-20 text-center text-3xl font-bold mb-6'>Login As Admin</h1>
        <Link to={"/"} className='text-sky-500'><span className='flex items-center mb-2'><IoMdArrowRoundBack /> Back To Home</span></Link>
        <Card className="max-w-full">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="adminEmail" value="Admin Email" />
              </div>
              <TextInput id="adminEmail" type="email" placeholder="example@mail.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="adminPassword" value="Admin Password" />
              </div>
              <TextInput id="adminPassword" type="password" required />
            </div>
            <Button type="submit" color='blue'>Login</Button>
          </form>
        </Card>
      </div>
    </Fragment>
  )
}
