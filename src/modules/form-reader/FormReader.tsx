import React, { useContext } from "react";
import {
  Row,
  Col,
  Typography,
  Checkbox,
  Radio,
  DatePicker,
  Upload,
} from "antd";
import { Form, Input, InputNumber, Button } from "antd";
import { TemplateContext } from "../../contexts";
import axios from "axios";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

export const FormReader = () => {
  const { templateState } = useContext(TemplateContext);
  const { templateDispatch } = useContext(TemplateContext);
  const saveBtn = () => {
    console.log(templateState);
    axios
      .post("http://localhost:8080/api/setForms", {
        form: templateState,
      })
      .then((res) => {
        templateDispatch({
          type: "RESET_TEMPLATE",
        
        });
        console.log(res);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col
            span={18}
            style={{
              textAlign: "center",
            }}
          >
            <Typography.Title level={3}>
              {" "}
              Template: {templateState.name}
            </Typography.Title>
          </Col>
          <Col>
            {" "}
            <Button
              style={{
                textAlign: "center",
              }}
              type={"primary"}
              onClick={() => {
                saveBtn();
              }}
            >
              save template
            </Button>
          </Col>
        </Row>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          {templateState.formItems.map((item, i) => {
            return (
              <Form.Item
                key={item.id}
                required={item.required}
                name={item.name + "/" + item.label}
                label={item.label}
                valuePropName={item.value ? "checked" : undefined}
                initialValue={item.value ? item.value : undefined}
              >
                {(() => {
                  switch (item.name) {
                    case "Input":
                      return <Input />;
                    case "InputNumber":
                      return <InputNumber />;
                    case "Checkbox":
                      return <Checkbox />;
                    case "Radio":
                      return <Radio />;
                    case "DatePicker":
                      return <DatePicker />;
                    case "UploadFile":
                      return (
                        <Upload>
                          <Button>Upload</Button>
                        </Upload>
                      );
                  }
                })()}
              </Form.Item>
            );
          })}
           <Form.Item>
   
      </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
