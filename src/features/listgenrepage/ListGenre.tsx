import { Fragment } from "react";
import { useFetchListGenre } from "../../hooks/useListGenre";
import { Table } from "antd";
import moment from "moment";
import { ColumnsType } from "antd/es/table";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Genre } from "../../types";
import { useDeleteGenre } from "./hooks/useDeleteGenre";
import { showToastSuccess } from "../../utils/toast";

type GenreWithKey = Genre & {
  key: number;
};

const columns: ColumnsType<GenreWithKey> = [
  {
    title: "No",
    dataIndex: "",
    render: (_, __, index) => {
      return <p>{index + 1}</p>;
    },
    align: "center",
    width: "50px",
  },
  {
    title: "Genre Title",
    dataIndex: "title",
    key: "title",
    align: "center",
    width: "350px",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    render: (_, item) => {
      return <p>{moment(item.created_at).format("DD-MM-YYYY HH:mm:ss")}</p>;
    },
    align: "center",
    width: "200px",
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    render: (_, item) => {
      return <p>{moment(item.updated_at).format("DD-MM-YYYY HH:mm:ss")}</p>;
    },
    align: "center",
    width: "200px",
  },
];

export default function ListGenre() {
  const navigate = useNavigate();

  const {
    isLoading: isLoadingGenre,
    isError,
    error,
    data: genres,
  } = useFetchListGenre();
  const { mutate } = useDeleteGenre(() => {
    navigate("/admin/genre");
    showToastSuccess("Delete Genre Success");
  });

  columns[4] = {
    title: "Action",
    dataIndex: "",
    render: (_, item) => (
      <div className="flex justify-center gap-2">
        <Link to={`/admin/genre/${item.id}/edit`}>
          <Button color="blue" size={"xs"}>
            <FaEdit />
          </Button>
        </Link>
        <Button
          onClick={() => {
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
                mutate({ id: item.id });
              }
            });
          }}
          color="failure"
          size={"xs"}
        >
          <FaTrash />
        </Button>
      </div>
    ),
    align: "center",
    width: "100px",
  };

  return (
    <Fragment>
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl text-center mb-4">List Genre</h1>
        <div className="w-32 mx-auto mb-6">
          <Link to={"/admin/genre/add"}>
            <Button className="mx-auto" color="success">
              Add Genre
            </Button>
          </Link>
        </div>
        {isLoadingGenre ? (
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
              <Table
                className="mb-10"
                columns={columns}
                dataSource={genres?.data.map((genre: Genre, index: number) => ({
                  ...genre,
                  key: index,
                }))}
                scroll={{ x: true }}
                pagination={false}
              />
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}
