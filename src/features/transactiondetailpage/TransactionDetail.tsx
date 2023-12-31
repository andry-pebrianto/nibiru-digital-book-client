import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";
import { Button } from "flowbite-react";
import { MdCancel } from "react-icons/md";
import { useSnap } from "../../hooks/useSnap";
import { useFetchDetailTransaction } from "./hooks/useDetailTransaction";

export default function TransactionDetail() {
  const params = useParams();
  const {
    isLoading,
    isError,
    error,
    data: transaction,
    refetch,
  } = useFetchDetailTransaction(params.id || "");
  const { snapEmbed, snapHide } = useSnap();
  const [showSnap, setShowSnap] = useState<boolean>(false);

  const payBook = () => {
    setShowSnap(true);
    snapEmbed(transaction?.data?.snap_token, "midtrans_embed");
  };

  const cancelPay = () => {
    setShowSnap(false);
    snapHide();
  };

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <Fragment>
      <div className="max-w-3xl mx-10 md:mx-auto bg-slate-100 p-8 mb-8 rounded-sm shadow-lg border-2 border-lime-600">
        <h1 className="text-3xl font-bold mb-4">
          {showSnap ? "Payment Detail" : "Transaction Detail"}
        </h1>
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
              <div className="text-center">{error.message}</div>
            ) : (
              <>
                {!showSnap && (
                  <>
                    <div className="mb-2">
                      <p className="text-lg">Customer Detail:</p>
                      <p>
                        - Name:{" "}
                        <span className="font-bold">
                          {transaction?.data?.customer?.fullname}
                        </span>
                      </p>
                      <p>
                        - Email:{" "}
                        <span className="font-bold">
                          {transaction?.data?.customer?.email}
                        </span>
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-lg">Book Detail:</p>
                      <p>
                        - Name:{" "}
                        <span className="font-bold">
                          {transaction?.data?.book?.title}
                        </span>
                      </p>
                      <p>
                        - Author:{" "}
                        <span className="font-bold">
                          {transaction?.data?.book?.author}
                        </span>
                      </p>
                      <p>
                        - Price:{" "}
                        <span className="font-bold">
                          IDR {transaction?.data?.book?.price}
                        </span>
                      </p>
                    </div>
                    {transaction?.data?.status === "PENDING" && (
                      <Button onClick={payBook} className="mt-4" size={"sm"}>
                        <FaMoneyBillWave />
                        <span className="ml-2">Pay Now!</span>
                      </Button>
                    )}
                    {transaction?.data?.status === "FAILURE" && (
                      <h1 className="mt-4">Payment has beed failed!</h1>
                    )}
                    {transaction?.data?.status === "SUCCESS" && (
                      <>
                        <h1 className="mt-4 text-lg bg-green-300 p-2 rounded-lg text-center shadow-lg mb-2">
                          Payment has been successful!
                        </h1>
                        <Link to={"/collection"} className="text-blue-600">Go To Collection Page</Link>
                      </>
                    )}
                  </>
                )}
                {showSnap && (
                  <Button
                    onClick={cancelPay}
                    className="mt-4 mb-6 mx-auto"
                    size={"sm"}
                  >
                    <MdCancel />
                    <span className="ml-2">Cancel</span>
                  </Button>
                )}
                <div
                  id="midtrans_embed"
                  className="w-full max-w-xl mx-auto mt-2"
                ></div>
              </>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}
