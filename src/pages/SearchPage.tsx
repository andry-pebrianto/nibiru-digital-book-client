import { Fragment } from 'react'
import SearchInput from '../features/searchpage/SearchInput'
import AllBookList from '../features/searchpage/AllBookList'

export default function SearchPage() {
  return (
    <Fragment>
      <SearchInput />
      <AllBookList />
    </Fragment>
  )
}
