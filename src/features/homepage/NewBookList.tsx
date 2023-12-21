import { Fragment } from 'react'
import { Card } from 'antd'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

export default function NewBookList() {
  return (
    <Fragment>
      <div className="max-w-7xl mx-3 sm:mx-5 xl:mx-auto mb-16">
        <h1 className='text-2xl mb-4 font-bold'>New Added</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          <Card
            className='w-50 border-2 relative'
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Link to={"/search?genreFilter=sciencefiction"}>
              <p className='absolute top-2 left-2'>
                <Button gradientMonochrome="info" size="xs" className='p-1' pill><span className='text-sm'>Science Fiction</span></Button>
              </p>
            </Link>
            <p className='text-[16.5px] font-semibold mb-1'>One Piece Vol 1</p>
            <p className='text-sm mb-4 text-gray-500'>Andry Pebrianto</p>
            <p className='text-lg font-semibold text-end mb-3'>Rp 80,000</p>

            <Button color="blue" size={"sm"} className='mb-3'><span className='mr-2'>Go To Detail</span><FaArrowRight /></Button>
            <hr />
            <p className='mt-3 text-[13px]'>Added at 11-11-2020</p>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}
