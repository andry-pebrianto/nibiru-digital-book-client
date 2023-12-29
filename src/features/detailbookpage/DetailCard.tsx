import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "antd";
import { FaCartPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Modal, Button as ButtonFlow } from "flowbite-react";
import ReactHtmlParser from "html-react-parser";
import { useFetchDetailBook } from "./hooks/useDetailBook";
import { BsFillCartCheckFill } from "react-icons/bs";
import { API } from "../../utils/api";
import { showToastError } from "../../utils/toast";
import { getError } from "../../utils/error";
import { useAppDispatch } from "../../redux/store";
import { getCart } from "../../redux/book/cartSlice";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

export default function DetailCard() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    isError,
    error,
    data: book,
    refetch,
  } = useFetchDetailBook(params.id || "");
  const [openModal, setOpenModal] = useState(false);

  const addToCartAndOpposite = async (bookId: string) => {
    try {
      await API.post(`/api/v1/customer/book/${bookId}/cart`);

      dispatch(getCart());
      refetch();
    } catch (error) {
      showToastError(getError(error));
    }
  };

  useEffect(() => {
    refetch();
  }, [params])

  return (
    <Fragment>
      {isLoading ? (
        <div role="status" className="flex justify-center mb-8">
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
            <div className="text-center mb-8">{error.message}</div>
          ) : (
            <Card className="max-w-7xl border-2 relative mx-auto mb-12">
              <div className="md:flex md:gap-6 relative">
                <Image
                  className="object-cover mx-auto sm:max-h-[500px] md:max-h-[400px] lg:max-h-[550px] md:flex-[1] max-w-[400px]"
                  src={book?.data?.photos[0]}
                  alt="Book Photo"
                />
                <Link
                  to={`/search?genreFilter=${book?.data?.genre?.title}`}
                  className="absolute top-3 left-3"
                >
                  <button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    {book?.data?.genre?.title}
                  </button>
                </Link>
                <div className="my-8 md:my-0 text-justify md:flex-[2]">
                  <h1 className="text-4xl font-bold mb-1">
                    {book?.data?.title}
                  </h1>
                  <p className="mb-2 text-[13px]">
                    Added At{" "}
                    {moment(book?.data?.created_at).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}
                  </p>
                  <p className="text-lg mb-2 text-gray-500">
                    {book?.data?.author}
                  </p>
                  <p className="mb-10">
                    <ButtonFlow
                      size={"xs"}
                      className="mb-2"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      See Full Synopsis
                    </ButtonFlow>
                  </p>
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(
                          `current index: ${current}, prev index: ${prev}`
                        ),
                    }}
                  >
                    <Row>
                      {book?.data?.photos.map(
                        (photo: string, index: number) =>
                          index !== 0 && (
                            <Col
                              xs={
                                book?.data?.photos.length - 1 <= 4
                                  ? book?.data?.photos.length - 1 <= 3
                                    ? 8
                                    : 6
                                  : 4
                              }
                              key={index}
                            >
                              <Image
                                width={"100%"}
                                height={"200px"}
                                className="object-cover"
                                src={photo}
                                alt="Book Photos"
                              />
                            </Col>
                          )
                      )}
                    </Row>
                  </Image.PreviewGroup>
                  <br />
                  <div className="flex justify-end gap-2">
                    <ButtonFlow color="blue" size={"sm"} className="mb-2">
                      <span className="text-lg">
                        <MdOutlineShoppingCartCheckout />
                      </span>
                      <span className="ml-2 mt-[2px]">BUY NOW</span>
                    </ButtonFlow>
                    {book?.data?.saved ? (
                      <ButtonFlow
                        color="success"
                        size={"sm"}
                        className="mb-2"
                        onClick={() => addToCartAndOpposite(book?.data?.id)}
                      >
                        <span className="text-lg">
                          <BsFillCartCheckFill />
                        </span>
                        <span className="ml-2 mt-[2px]">REMOVE FROM CART</span>
                      </ButtonFlow>
                    ) : (
                      <ButtonFlow
                        color="dark"
                        size={"sm"}
                        className="mb-2"
                        onClick={() => addToCartAndOpposite(book?.data?.id)}
                      >
                        <span className="text-lg">
                          <FaCartPlus />
                        </span>
                        <span className="ml-2 mt-[2px]">ADD TO CART</span>
                      </ButtonFlow>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </>
      )}

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Book Synopsis</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="unreset leading-relaxed text-gray-500 dark:text-gray-400">
              {ReactHtmlParser(book?.data?.synopsis || "")}
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
