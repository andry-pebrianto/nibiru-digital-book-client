import { Fragment, useEffect, useState } from "react";
import { Badge, Button, Navbar } from "flowbite-react";
import { BsCartFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getCart } from "../../redux/book/cartSlice";
import { BookAdmin } from "../../types";
import { API } from "../../utils/api";
import { showToastError } from "../../utils/toast";
import { getError } from "../../utils/error";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: cart,
    isLoading,
    isError,
    error,
  } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const buyBook = async (bookId: string) => {
    try {
      const transaction = await API.post("/api/v1/customer/transaction", {
        bookId,
      });

      if (cart.map((item: BookAdmin) => item.id).includes(bookId)) {
        await API.post(`/api/v1/customer/book/${bookId}/cart`);
        dispatch(getCart());
      }

      onClose();
      navigate(`/transaction/${transaction.data.data.transactionId}`);
    } catch (error) {
      showToastError(getError(error));
    }
  };

  return (
    <Fragment>
      <Navbar.Link
        className="flex items-center cursor-pointer"
        onClick={showDrawer}
      >
        <span className="mr-1">
          <BsCartFill />
        </span>{" "}
        Cart{" "}
        {cart.length ? (
          <Badge className="ml-1" color="info">
            {cart.length}
          </Badge>
        ) : (
          ""
        )}
      </Navbar.Link>

      <Drawer
        title="My Cart"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
      >
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
              <div className="text-center mb-8">{error}</div>
            ) : (
              <>
                {cart.length ? (
                  <>
                    {cart.map((book: BookAdmin) => (
                      <div
                        key={book.id}
                        className="max-w-full mb-4 py-3 px-5 border-2 shadow-sm rounded-sm"
                      >
                        <div className="flex gap-4 items-center">
                          <div>
                            <img
                              src={book?.photos[0]}
                              alt="Book Image"
                              className="w-16 h-[90px] object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="text-lg font-bold text-gray-900 mb-1">
                              {book.title}
                            </h5>
                            <div className="flex gap-2">
                              <Link to={`/book/${book.id}`}>
                                <Button
                                  color="success"
                                  size={"xs"}
                                  className="mb-2"
                                >
                                  <span className="text-lg">
                                    <BiDetail />
                                  </span>
                                  <span className="ml-2 mt-[2px]">DETAIL</span>
                                </Button>
                              </Link>
                              <Button
                                onClick={() => buyBook(book.id)}
                                color="blue"
                                size={"xs"}
                                className="mb-2"
                              >
                                <span className="text-lg">
                                  <MdOutlineShoppingCartCheckout />
                                </span>
                                <span className="ml-2 mt-[2px]">BUY NOW</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <h1 className="text-3xl text-center">Cart Empty</h1>
                )}
              </>
            )}
          </>
        )}
      </Drawer>
    </Fragment>
  );
}
