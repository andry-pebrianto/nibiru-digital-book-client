import { Fragment, useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import { Col, Pagination, Row } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function ListBook() {
  const [openModal, setOpenModal] = useState(false);

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
      <div className='mb-12 mx-3'>
        <Button className='mx-auto mb-4' color='success'>Add Book</Button>
        <Row justify={"center"} className='gap-6 mb-8'>
          <Col xs={24} lg={10}>
            <div className="flex max-w-4xl mx-auto border-2 shadow-md rounded">
              <div className='flex-1 p-5'>
                <h1 className='text-lg'>Title: <span className='font-bold'>Judul Buku 1</span></h1>
                <p className='mb-3 text-sm'>Author: <span>Andry Pebrianto</span></p>
                <Button size={"xs"} className='py-2 mb-2' onClick={() => setOpenModal(true)}>See Full Synopsis</Button>
                <div className='flex gap-1'>
                  <Button color='blue' size={"xs"}><FaEdit /></Button>
                  <Button color='failure' size={"xs"}><FaTrash /></Button>
                  <Button color='dark' size={"xs"}><MdOutlineBlock /></Button>
                </div>
              </div>
              <img className='h-48 sm:h-52 rounded' src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="" />
            </div>
          </Col>
          <Col xs={24} lg={10}>
            <div className="flex max-w-4xl mx-auto border-2 shadow-md rounded">
              <div className='flex-1 p-5'>
                <h1 className='text-lg'>Title: <span className='font-bold'>Judul Buku 1</span></h1>
                <p className='mb-3 text-sm'>Author: <span>Andry Pebrianto</span></p>
                <Button size={"xs"} className='py-2 mb-2' onClick={() => setOpenModal(true)}>See Full Synopsis</Button>
                <div className='flex gap-1'>
                  <Button color='blue' size={"xs"}><FaEdit /></Button>
                  <Button color='failure' size={"xs"}><FaTrash /></Button>
                  <Button color='dark' size={"xs"}><MdOutlineBlock /></Button>
                </div>
              </div>
              <img className='h-48 sm:h-52 rounded' src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="" />
            </div>
          </Col>
        </Row>
        <div className='text-center'>
          <Pagination showQuickJumper={100 >= 100} showSizeChanger={false} defaultCurrent={1} current={page} defaultPageSize={18} pageSize={18} total={180} onChange={changePagePagination} />
        </div>
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Book Synopsis</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti dignissimos nam cum obcaecati praesentium minima ducimus, asperiores illo sit veniam hic neque minus id perspiciatis totam. Iste provident distinctio voluptate. Ratione, dolor ipsam? Ducimus excepturi, et praesentium provident totam tempora eos dicta necessitatibus dolorem at quia facilis porro culpa voluptatum dolores consectetur incidunt quod facere cumque eligendi. Debitis laboriosam fuga dolor numquam rerum tempore beatae deserunt officiis optio recusandae et dolorum modi provident ab nobis maxime sint, possimus inventore nam voluptates placeat veritatis officia. Voluptatibus eius voluptate quo, labore necessitatibus iure incidunt mollitia deserunt officiis similique, odit eos, maxime quia!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
