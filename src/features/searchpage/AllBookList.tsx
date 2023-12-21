import { Fragment, useEffect, useState } from 'react'
import { Card, Pagination } from 'antd'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function AllBookList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [page, setPage] = useState<number>(0);

  const changePagePagination = (page: number) => {
    if (page === 1) {
      queryParams.delete("page");
    } else {
      queryParams.set('page', page.toString());
    }

    const newUrl = `${location.pathname}?${queryParams.toString()}`;
    navigate(newUrl)
  }

  useEffect(() => {
    setPage(parseInt(queryParams.get("page") || "0"))
  }, [queryParams])

  return (
    <Fragment>
      <div className="max-w-7xl mx-3 sm:mx-5 xl:mx-auto mb-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-8">
          <Card
            className='w-50 border-2 relative'
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Link to={"/search?genreFilter=sciencefiction"}>
              <p className='absolute top-2 left-2'>
                <Button gradientMonochrome="info" size="xs"><span className='text-sm'>Science Fiction</span></Button>
              </p>
            </Link>
            <p className='text-[16.5px] font-semibold mb-1'>One Piece Vol 1</p>
            <p className='text-sm mb-4 text-gray-500'>Andry Pebrianto</p>
            <p className='text-lg font-semibold text-end mb-3'>Rp 80,000</p>
            <hr />
            <p className='mt-3 text-[13px]'>Added at 11-11-2020</p>
          </Card>        </div>
        <div className='text-center'>
          <Pagination showQuickJumper={100 >= 100} showSizeChanger={false} defaultCurrent={1} current={page} defaultPageSize={18} pageSize={18} total={180} onChange={changePagePagination} />
        </div>
      </div>
    </Fragment>
  )
}
