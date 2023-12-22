import { Fragment, useEffect } from 'react'
import DetailCard from '../../features/detailbookpage/DetailCard'

export default function DetailBookPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Fragment>
      <DetailCard />
    </Fragment>
  )
}
