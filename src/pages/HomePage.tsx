import { Fragment } from 'react'
import GenresCarousel from '../features/homepage/GenresCarousel'
import NewBookList from '../features/homepage/NewBookList'

export default function HomePage() {
  return (
    <Fragment>
      <GenresCarousel />
      <NewBookList />
    </Fragment>
  )
}
