import { Fragment } from 'react'
import ListBook from '../../features/listbookpage/ListBook'
import SearchInput from '../../features/searchpage/SearchInput'

export default function ListBookPage() {
  return (
    <Fragment>
      <SearchInput />
      <ListBook />
    </Fragment>
  )
}
