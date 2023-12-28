import { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { Col, Empty, Image, Pagination, Row } from "antd";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import { useFetchListBookAdmin } from "./hooks/useListBookAdmin";
import { BookAdmin } from "../../types";
import { useDeleteBook } from "./hooks/useDeleteBook";
import { showToastSuccess } from "../../utils/toast";
import Swal from "sweetalert2";

export default function ListBook() {
  const [openModal, setOpenModal] = useState(false);
  const [synopsisSelected, setSynopsisSelected] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [page, setPage] = useState<number>(0);

  const {
    isLoading,
    isError,
    error,
    data: books,
    refetch,
  } = useFetchListBookAdmin(
    queryParams.get("searchFilter") || "",
    queryParams.get("genreFilter") || "",
    queryParams.get("page") || ""
  );

  const changePagePagination = (page: number) => {
    if (page === 1) {
      queryParams.delete("page");
    } else {
      queryParams.set("page", page.toString());
    }

    const newUrl = `${location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };

  useEffect(() => {
    setPage(parseInt(queryParams.get("page") || "0"));
    refetch();
    window.scrollTo(0, 0);
  }, [queryParams]);

  const { mutate } = useDeleteBook(() => {
    navigate("/admin/book");
    showToastSuccess("Suspend/Unsuspend Book Success");
  });

  const deleteBook = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Selected Genre Will Permanently Deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate({ id });
      }
    });
  };

  return (
    <Fragment>
      <div className="mb-12 mx-3">
        <div className="w-28 mx-auto mb-6">
          <Link to={"/admin/book/add"}>
            <Button className="mx-auto" color="success">
              Add Book
            </Button>
          </Link>
        </div>
        {isLoading ? (
          <div role="status" className="flex justify-center">
            <svg
              aria-hidden="true"
              className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {isError ? (
              <div className="text-center my-5">{error.message}</div>
            ) : (
              <>
                {books?.data?.length ? (
                  <Row justify={"center"} className="gap-6 mb-8">
                    <>
                      {books?.data.map((book: BookAdmin) => (
                        <Col key={book.id} xs={24} lg={10}>
                          <div className="flex max-w-4xl mx-auto border-2 shadow-md rounded">
                            <div className="flex-1 p-5">
                              <h1 className="text-lg">
                                Title:{" "}
                                <span className="font-bold">{book.title}</span>
                              </h1>
                              <p className="text-sm">
                                Author: <span>{book.author}</span>
                              </p>
                              <p className="mb-2 text-sm">
                                Genre: <span>{book.genre.title}</span>
                              </p>
                              <Button
                                size={"xs"}
                                className="mb-2"
                                onClick={() => {
                                  setSynopsisSelected(book.synopsis);
                                  setOpenModal(true);
                                }}
                              >
                                See Full Synopsis
                              </Button>
                              <div className="flex gap-1">
                                <Link to={`/admin/book/${book.id}/edit`}>
                                  <Button color="blue" size={"xs"}>
                                    <FaEdit />
                                  </Button>
                                </Link>
                                {book.active ? (
                                  <Button
                                    onClick={() => deleteBook(book.id)}
                                    color="success"
                                    size={"xs"}
                                  >
                                    <FaLockOpen />
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => deleteBook(book.id)}
                                    color="dark"
                                    size={"xs"}
                                  >
                                    <FaLock />
                                  </Button>
                                )}
                              </div>
                            </div>
                            <Image
                              width={"160px"}
                              height={"180px"}
                              className="rounded object-cover"
                              src={book.photos[0]}
                            />
                          </div>
                        </Col>
                      ))}
                    </>
                  </Row>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </>
            )}
          </>
        )}
        {!isLoading && !isError ? (
          <div className="text-center">
            <Pagination
              showQuickJumper={100 >= 100}
              showSizeChanger={false}
              defaultCurrent={1}
              current={page}
              defaultPageSize={10}
              pageSize={10}
              total={books?.total}
              onChange={changePagePagination}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Book Synopsis</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="unreset leading-relaxed text-gray-500 dark:text-gray-400">
              {ReactHtmlParser(synopsisSelected)}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
