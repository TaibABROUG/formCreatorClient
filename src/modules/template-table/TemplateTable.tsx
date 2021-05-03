import { Row, Col, Table, Tooltip, Button, Form, Input, InputNumber, 
  notification,
  Checkbox,
  Radio,
  DatePicker,
  Upload, } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { IconType } from "antd/lib/notification";

type Props = {
  match: any;
};

export const TemplateTable = ({ match }: Props) => {


  const [data, setFormList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/getForms").then((response) => {
      console.log(response.data);
      setFormList(response.data.map((data:any)=>{ return(
        {name:data.name,
          key:data._id,
          actions:data._id
        }
      )}));
      
    });
  }, []);

  const openNotificationWithIcon = (type: any) => {
    notification[type as IconType]({
      message: " template deleted Successfully",
      top: 125,
    });
  };
  const deleteRow = (values: any) => {
    axios
    .delete("http://localhost:8080/api/deleteFormById/" + values, )
    .then((res) => {
      console.log(res);
     
        axios.get("http://localhost:8080/api/getForms").then((response) => {
          console.log(response.data);
          setFormList(response.data.map((data:any)=>{ return(
            {name:data.name,
              key:data._id,
              actions:data._id
            }
          )}));
          
        });
     
      openNotificationWithIcon("success");
    })
    .catch((err) => {
      console.log(err);
    });
    
    console.log(values);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (Actions: string) => {
        return (
         <div> <Tooltip title={"Details"}>
            <Link
              to={{
                pathname: `${match.url}/${Actions}`,
              }}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EyeOutlined />}
                size="small"
              />
            </Link>
          </Tooltip>
          <Tooltip title={"Details"}>
            <Button
               onClick={(e) => deleteRow(Actions)}
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              size="small"
            />
        </Tooltip>
        </div>
        );
      },
    },
  ];
  return (
    <Row>
      <Col span={24}>
        <Table dataSource={data} columns={columns} />;
      </Col>
    </Row>
  );
};
