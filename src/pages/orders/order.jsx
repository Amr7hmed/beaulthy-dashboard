import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import {Table,Space} from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Order(props) {
  
  const [response, setResponse] = useState("");
  const [Pending, setPending] = useState(true);


  useEffect(() => {
    const options = {
      method: "get",
      url: `${process.env.REACT_APP_API_BASEURL}/api/admin/orders/${props.match.params.id}`,
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
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <>{text}</>,
    },
    {
      title: "City Price",
      dataIndex: "city_price",
      key: "city_price",
      render: (number) => <>{number}</>,
    },
    {
      title: "District Price",
      dataIndex: "district_price",
      key: "district_price",
      render: (number) => <>{number}</>,
    },
    
  ];


  


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
            expandable={{
              expandedRowRender: (record) =>
                console.log("res", record),
              rowExpandable: (record) => record.children === null,
            }}
          />

        </Container>
      )}
    </div>
  )
}
