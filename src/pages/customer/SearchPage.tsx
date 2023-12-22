import { Fragment, useEffect } from 'react'
import SearchInput from '../../features/searchpage/SearchInput'
import AllBookList from '../../features/searchpage/AllBookList'

export default function SearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Fragment>
      <SearchInput />
      <AllBookList />
    </Fragment>
  )
}
