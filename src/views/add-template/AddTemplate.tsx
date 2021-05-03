import { Row, Col } from "antd";
import React from "react";
import { FormBuilder, FormReader } from "../../modules";

export const AddTemplate = () => {
  return (
    <Row>
      <Col span={12}>
        <FormBuilder />
      </Col>
      <Col span={12}>
        <FormReader />
      </Col>
    </Row>
  );
};
