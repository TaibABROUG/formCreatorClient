import React, { useContext, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Button,
  Switch,
  Alert,
  notification,
} from "antd";
import { TemplateContext } from "../../../../contexts";
import { FormItemsNames } from "../../../../config";
import { IconType } from "antd/lib/notification";

type Props = {
  inputName: string;
  visibile: boolean;
  closeModal: () => void;
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

type State = {
  loading: boolean;
  error: boolean | null;
  success: boolean | null;
};

export const FormBuilderItemModal = ({
  closeModal,
  inputName,
  visibile,
}: Props) => {
  const [form] = Form.useForm();

  const openNotificationWithIcon = (type: any) => {
    notification[type as IconType]({
      message: `${inputName} Added to the template Successfully`,
      top: 125,
    });
  };

  const { templateDispatch } = useContext(TemplateContext);

  const [compState] = useState<State>({
    error: null,
    loading: false,
    success: null,
  });

  const onResetForm = () => {
    form.resetFields();
  };

  const submitForm = (values: any) => {
    templateDispatch({
      type: "ADD_INPUT_FORM",
      payload: {
        id: Math.random().toString(36).substring(7),
        name: inputName,
        label: values.label,
        value: values.defaultChecked ? values.defaultChecked : undefined,
        required: values.required,
      },
    });
    openNotificationWithIcon("success");
    closeModal();
  };
  const { error, success } = compState;

  return (
    <Modal
      onCancel={closeModal}
      visible={visibile}
      title={`Adding a new ${inputName}`}
      destroyOnClose
      footer={null}
    >
      <Row>
        {success && (
          <Col span={24}>
            <Alert type="success" message={`all good `} />
          </Col>
        )}
        {error && (
          <Col span={24}>
            <Alert type="error" message={` something wrong!`} />
          </Col>
        )}
        <Col span={24}>
          <Form form={form} {...formItemLayout} onFinish={submitForm}>
            <Form.Item
              name="label"
              label={"Label"}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="required"
              label={"Required"}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            {(inputName === FormItemsNames.Checkbox ||
              inputName === FormItemsNames.Radio) && (
              <>
                <Form.Item
                  name="defaultChecked"
                  label={"defaultChecked"}
                  valuePropName="checked"
                  rules={[{ required: true }]}
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  name="defaultValue"
                  label={"defaultValue"}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </>
            )}

            <Row justify={"center"}>
              <Form.Item>
                <Space>
                  <Button
                    onClick={onResetForm}
                    size={"middle"}
                    htmlType="button"
                  >
                    reset
                  </Button>
                  <Button
                    size={"middle"}
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                  >
                    {" "}
                    Save
                  </Button>
                </Space>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};
