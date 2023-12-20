import { Button } from 'antd'
import { Button as FlowButton, Navbar } from 'flowbite-react'
import { Fragment } from 'react'

export default function App() {
  return (
    <Fragment>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button>Get started</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <br /><br /><br /><br />

      <FlowButton color="blue">Primary</FlowButton>
      <Button type='primary'>Primary</Button>
    </Fragment>
  )
}
