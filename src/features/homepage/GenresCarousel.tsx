import { Fragment } from 'react'
import { Carousel } from 'flowbite-react'

export default function GenresCarousel() {
  return (
    <Fragment>
      <div className="max-w-2xl h-80 sm:h-64 mx-2 sm:mx-auto">
      <h1 className='text-2xl text-center mb-3'>Berbagai Pilihan Genre Sesuai Seleramu!</h1>
        <Carousel>
          <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
        </Carousel>
      </div>
    </Fragment>
  )
}
