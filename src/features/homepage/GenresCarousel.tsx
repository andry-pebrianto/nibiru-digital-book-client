import { Fragment } from 'react'
import { Carousel } from 'flowbite-react'

export default function GenresCarousel() {
  return (
    <Fragment>
      <h1 className='text-3xl text-center mb-4 font-semibold'>VARIOUS BEST GENRES</h1>
      <div className="max-w-3xl h-80 mx-2 sm:mx-auto mb-16">
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
