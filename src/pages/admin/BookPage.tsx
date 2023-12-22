import { Fragment } from 'react'
import ListBook from '../../features/bookpage/ListBook'
import SearchInput from '../../features/searchpage/SearchInput'

export default function BookPage() {
  return (
    <Fragment>
      <SearchInput />
      <ListBook />
    </Fragment>
  )
}
