import { Fragment, useEffect } from "react";
import { TransactionItem } from "../../types";
import { Table, Tag } from "antd";
import { Empty } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

interface TabItemProps {
  transactions: TransactionItem[];
  status: string;
}

type TransactionWithKey = TransactionItem & {
  key: number;
};

const columns: ColumnsType<TransactionWithKey> = [
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
    title: "Book Title",
    dataIndex: "title",
    render: (_, item) => {
      return <p>{item.book.title}</p>;
    },
    align: "center",
    width: "350px",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (_, item) => {
      return (
        <>
          {item.status === "PENDING" && <Tag color="blue">{item.status}</Tag>}
          {item.status === "SUCCESS" && <Tag color="green">{item.status}</Tag>}
          {item.status === "FAILURE" && <Tag color="red">{item.status}</Tag>}
        </>
      );
    },
    align: "center",
    width: "100px",
  },
  {
    title: "Book Cover",
    dataIndex: "photos",
    render: (_, item) => {
      return (
        <img
          src={item.book.photos[0]}
          className="h-24 w-16 mx-auto object-cover"
          alt="Book Cover"
        />
      );
    },
    align: "center",
    width: "350px",
  },
  {
    title: "Date Transaction",
    dataIndex: "created_at",
    render: (_, item) => {
      return <p>{moment(item.created_at).format("DD-MM-YYYY HH:mm:ss")}</p>;
    },
    align: "center",
    width: "200px",
  },
];

export default function TabItem(props: TabItemProps) {
  useEffect(() => {
    if (props.status === "PENDING") {
      columns[6] = {
        title: "Action",
        dataIndex: "",
        render: (_, item) => (
          <div className="flex justify-center gap-2">
            <Link to={`/transaction/${item.id}`}>
              <Button color="blue" size={"xs"}>
                Pay Now
              </Button>
            </Link>
          </div>
        ),
        align: "center",
        width: "150px",
      };
    } else {
      delete columns[6];
    }
  }, [props]);

  return (
    <Fragment>
      {!props.transactions.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <Table
            className="mb-10"
            columns={columns}
            dataSource={props.transactions?.map(
              (transaction: TransactionItem, index: number) => ({
                ...transaction,
                key: index,
              })
            )}
            scroll={{ x: true }}
            pagination={false}
          />
        </>
      )}
    </Fragment>
  );
}
