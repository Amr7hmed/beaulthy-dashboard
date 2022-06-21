import React from 'react';
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import {Table,Space} from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Pagination } from "antd";


export default function OrdersList() {
  
  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);
  const [Pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/orders`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    axios(options)
      .then(function (response) {
        console.log("handle success");
        setResponse(response.data.data.data);
        setPending(false);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log("hande error");
        console.log(error);
      });
  }, []);


  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <>{text}</>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (number) => <>{number}</>,
    },
    {
      title: "Total Promos",
      dataIndex: "total_promos",
      key: "total_promos",
      render: (number) => <>{number}</>,
    },
    {
      title: "Sub Total",
      dataIndex: "sub_total",
      key: "sub_total",
      render: (number) => <>{number}</>,
    },
    {
      title: "Final Total",
      dataIndex: "final_total",
      key: "final_total",
      render: (number) => <>{number}</>,
    },
    
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>         
         <Link to={`/order/${record.id}`} className="btn btn-success">Order</Link>
        
        </Space>
      ),
    },
  ];

  const onPagination = (id) => {
    setCurrentPage(id);
    setPending(true);
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/orders?page=${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };
    axios(options)
      .then(function (response) {
        console.log("    handle success");
        setResponse(response.data.data.data);
        setPages(response.data.data.meta);
        setPending(false);
        console.log(response.data.data.data);
      })
      .catch(function (error) {
        console.log("    hande error");
        console.log(error);
      });
  };

  return (
    <div>
      {Pending ? (
        <Loading />
      ) : (
        <Container className="py-5">
          <Table
            bordered
            columns={columns}
            dataSource={response}
            pagination={false}
          />

          <div className="d-flex align-items-center justify-content-center py-3">
            <Pagination
              defaultCurrent={currentPage}
              total={Pages.total}
              onChange={(e) => onPagination(e)}
              showSizeChanger={false}
            />
          </div>
          
        </Container>
      )}
    </div>
  );
}

