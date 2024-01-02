import { CSSProperties, Fragment } from "react";
import { Card, Empty } from "antd";
import { Button } from "flowbite-react";
import { FaBook } from "react-icons/fa";
import { useFetchListLibrary } from "./hooks/useLibrary";
import { BookAdmin } from "../../types";
import { downloadFile } from "../../utils/download";

const customStyleTitle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default function BookList() {
  const { isLoading, isError, error, data: library } = useFetchListLibrary();

  return (
    <Fragment>
      <div className="container max-w-7xl mb-7 mx-auto border-1 shadow-lg px-8 py-4">
        {isLoading ? (
          <div role="status" className="flex justify-center my-4">
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
                {library?.data?.length ? (
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
                    {library?.data?.map((book: BookAdmin) => (
                      <Card
                        key={book.id}
                        className="w-full border-2 relative"
                        cover={
                          <img
                            alt="Book Cover"
                            src={book?.photos[0]}
                            className="h-[180px] object-cover"
                          />
                        }
                      >
                        <p
                          className="text-[16.5px] font-semibold mb-3"
                          style={customStyleTitle}
                        >
                          {book?.title}
                        </p>

                        <div className="flex xs:block sm:flex gap-2">
                          <Button
                            color="success"
                            size={"sm"}
                            className="mb-2"
                            onClick={() =>
                              downloadFile(book.file_url, book.title)
                            }
                          >
                            <span className="mr-2">Read</span>
                            <FaBook />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}
