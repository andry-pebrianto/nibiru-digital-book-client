import { Fragment } from 'react'
import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import AppLogo from "../../assets/logo.png"

export default function MainFoot() {
  return (
    <Fragment>
      <Footer container className='border'>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <div className="flex items-center mb-7">
                <FooterBrand
                  src={AppLogo}
                  alt="Nibiru Digital Book"
                  className='h-10 sm:h-9'
                />
                <p className='text-xl font-bold'>Nibiru Digital Book</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle title="about" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Andry Pebrianto</FooterLink>
                  <FooterLink href="#">Nibiru Developers</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Github</FooterLink>
                  <FooterLink href="#">Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal Information" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="https://github.com/andry-pebrianto" by="Andry Pebrianto" year={new Date().getFullYear()} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={FaGithubSquare} />
              <FooterIcon href="#" icon={FaLinkedin} />
              <FooterIcon href="#" icon={FaWhatsappSquare} />
              <FooterIcon href="#" icon={FaFacebookSquare} />
              <FooterIcon href="#" icon={FaInstagramSquare} />
            </div>
          </div>
        </div>
      </Footer>
    </Fragment>
  )
}
