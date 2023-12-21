import { Fragment, useEffect, useState } from 'react'
import { Card, Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis quas beatae qui, recusandae odio?</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut maiores tempora cumque eos et.</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut maiores tempora cumque eos et.</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut maiores tempora cumque eos et.</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut maiores tempora cumque eos et.</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut maiores tempora cumque eos et.</p>
          </Card>
          <Card
            className='w-50 border-2'
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut maiores tempora cumque eos et.</p>
          </Card>
        </div>
        <div className='text-center'>
          <Pagination showQuickJumper={100 >= 100} showSizeChanger={false} defaultCurrent={1} current={page} defaultPageSize={18} pageSize={18} total={180} onChange={changePagePagination} />
        </div>
      </div>
    </Fragment>
  )
}
