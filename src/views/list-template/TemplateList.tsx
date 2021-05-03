import React from "react";
import { Switch, RouteComponentProps, Route } from "react-router-dom";
import { Row, Col } from "antd";
import {   TemplateTable ,TemplateDetails} from "../../modules";

type Props = {} & RouteComponentProps;

export const TemplateList = (props: Props) => {
  const { match } = props;
  const { path } = match;

  return (
    <Row>
      <Col span={24}>
        <Switch>
          <Route exact path={`${path}`} component={TemplateTable} />
          <Route path={`${path}/:id`} component={TemplateDetails} />
        </Switch>
      </Col>
    </Row>
  );
};
