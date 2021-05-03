import React, { useContext, useState } from "react";
import { Row, Col, Button, Form, Input, Space } from "antd";
import { formItemsConfig } from "../../config";
import { TemplateContext } from "../../contexts";
import { FormBuilderItemModal } from "./components";

type Props = {};
const formItemLayout = {
  wrapperCol: {
    span: 12,
  },
};
type State = {
  selectedInput: string | null;
  isVisible: boolean;
};
export const FormBuilder = (props: Props) => {
  const [compState, setCompState] = useState<State>({
    selectedInput: null,
    isVisible: false,
  });
  const [form] = Form.useForm();
  const { templateDispatch } = useContext(TemplateContext);
  const AddTemplateName = () => {
    if (form.getFieldValue("TemplateName")) {
      templateDispatch({
        type: "CHANGE_NAME",
        payload: form.getFieldValue("TemplateName"),
      });
    }
  };
  const onFinish = (values: any) => {};
  const handleSelectedInput = (selectedInput: string) => {
    setCompState({
      ...compState,
      isVisible: true,
      selectedInput,
    });
  };

  const closeModal = () => {
    setCompState({
      ...compState,
      isVisible: false,
      selectedInput: null,
    });
  };

  return (
    <Row
      style={{
        borderRight: "2px solid black",
      }}
      gutter={[16, 16]}
    >
      <Col span={24}>
          {compState.isVisible && compState.selectedInput && (
            <FormBuilderItemModal
              closeModal={closeModal}
              visibile={compState.isVisible}
              inputName={compState.selectedInput}
            />
          )}
          <Form form={form} {...formItemLayout} onFinish={onFinish}>
            <Row gutter={[16, 16]}>
              <Col xl={16} xs={24}>
                <Form.Item
                  rules={[{ required: true }]}
                  name="TemplateName"
                  label={"template Name"}
                  required={true}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={8} xs={24}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  onClick={AddTemplateName}
                >
                  add template Name
                </Button>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              {Object.keys(formItemsConfig).map((item: any, i) => {
                return (
                  <Col key={item}>
                    <Button
                      onClick={() => {
                        handleSelectedInput(item);
                      }}
                      size={"middle"}
                      type="primary"
                    >
                      {item}
                    </Button>
                  </Col>
                );
              })}
            </Row>
            <Row
              style={{
                padding: "16px",
              }}
            >

            </Row>
          </Form>
      </Col>
    </Row>
  );
};
