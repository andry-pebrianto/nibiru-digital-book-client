import { Fragment } from 'react'
import { Button, Card, Col, Image, Row } from 'antd'
import { FaCartShopping } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function DetailCard() {
  return (
    <Fragment>
      <Card className='max-w-7xl border-2 relative mx-auto mb-12'>
        <div className="md:flex md:gap-6 relative">
          <Image className='object-cover mx-auto sm:max-h-[500px] md:max-h-[400px] lg:max-h-[550px] md:flex-[1]' src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="" />
          <Link to={"/"} className='absolute top-3 left-3'>
            <button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Science Fiction</button>
          </Link>
          <div className='my-8 md:my-0 text-justify md:flex-[2]'>
            <h1 className='text-4xl font-bold mb-1'>Judul Buku</h1>
            <p className='mb-2 text-[13px]'>Added At 11-11-2020</p>
            <p className='text-lg mb-1 text-gray-500'>Andry Pebrianto</p>
            <p className='mb-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nostrum molestiae eius nam error, soluta unde iure laboriosam temporibus, vero assumenda aliquam perferendis, in sunt iste non et laudantium minima magni omnis ex sit alias debitis! Beatae officia quod, cumque aspernatur dolorum provident quam quas sint doloremque eius cum animi sapiente perspiciatis voluptate facilis totam dolor ipsam? Hic quaerat voluptate esse dolorem id, impedit porro, architecto, vitae culpa deleniti ut illo! Cumque aut beatae explicabo. Dolorem pariatur incidunt quam atque. Ad facere ullam fugit quo consectetur quas, voluptatem consequatur iste eius necessitatibus odio architecto possimus recusandae similique. Tempora, non aspernatur?</p>
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <Row>
                <Col xs={4}>
                  <Image width={"100%"} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                </Col>
                <Col xs={4}>
                  <Image width={"100%"} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
                </Col>
                <Col xs={4}>
                  <Image width={"100%"} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                </Col>
                <Col xs={4}>
                  <Image width={"100%"} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
                </Col>
                <Col xs={4}>
                  <Image width={"100%"} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                </Col>
                <Col xs={4}>
                  <Image width={"100%"} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
                </Col>
              </Row>
            </Image.PreviewGroup>
            <br />
            <div className='flex justify-end'>
              <Button className='mt-8 flex pt-2 items-center gap-2 scale-105 mx-2' type='primary'><FaMoneyBillWave /> BUY NOW</Button>
              <Button className='mt-8 flex pt-2 items-center gap-2 scale-105 mx-2'><FaCartShopping /> ADD TO CART</Button>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  )
}
