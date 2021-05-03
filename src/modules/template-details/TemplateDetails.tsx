import { Form, Input, InputNumber, Button,
  
  notification,

  Row,
  Col,

  Checkbox,
  Radio,
  DatePicker,
  Upload,
} from "antd";


import { IconType } from "antd/lib/notification";
import React, { useEffect, useState } from "react";
import axios from "axios";


type Props = {
  match: any;
  history: any;
  location: any;
};

export const TemplateDetails = (props: Props) => {
  const [formt] = Form.useForm();
 
  const [template, setFormList] = useState(Object);
  const [form, setFormInputs] = useState([Object]);


  const { match } = props;
  const { params } = match;
  const templateID = params.id;


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getFormById/" + templateID)
      .then((response) => {
        console.log(response.data.form);
        setFormList(response.data);
        setFormInputs (response.data.form) ; 
      });
  }, []);
  console.log(template);

  const openNotificationWithIcon = (type: any) => {
    notification[type as IconType]({
      message: " Form added Successfully",
      top: 125,
    });
  };

  const onFinish = (values: any) => {
    axios
    .post("http://localhost:8080/api/setContent/" + templateID, {
      form: values,
    })
    .then((res) => {
      console.log(res);
      openNotificationWithIcon("success");
     
      window.print();
      formt.resetFields ();
    
    })
    .catch((err) => {
      console.log(err);
    });
    
    console.log(values);
  };
const handleSubmitted = (res : any, fields: any, form: any ) => {
    form.reset() // resets "username" field to "admin"
  }
  
  return (
    <Row>
      <Col span={24}>
        <h1>{template.name}</h1>
        <Form  name="nest-messages" form= {formt}    onFinish={onFinish}>
          {form.map((item: any, i: any) => {
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
               <Button type="primary" htmlType="submit"  >
          Submit
        </Button>
        </Form>
     
      </Col>
    </Row>
  );
};
