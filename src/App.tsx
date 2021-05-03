import React from "react";
import "./App.css";
import { Layout, Breadcrumb, Menu } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import { TemplateContextProvider } from "./contexts";
import { Switch, Route, Redirect, Link, useLocation } from "react-router-dom";
import { AddTemplate, TemplateList } from "./views";

type Props = {};

function App(Props: Props) {
  const { pathname } = useLocation();
  return (
    <TemplateContextProvider>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["template-add"]}
            selectedKeys={[pathname.split("/")[1]]}
          >
            <Menu.Item key="templates-list">
              <Link to="/templates-list">Templates List</Link>
            </Menu.Item>
            <Menu.Item key="template-add">
              <Link to="/template-add">Add a template</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 0.5em", marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {pathname
              .replace("/", "")
              .replace("-", "/")
              .split("/")
              .map((path) => {
                return <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>;
              })}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: "70vh" }}
          >
            <Switch>
              <Route exact path="/">
                <Redirect exact from="/" to="/template-add" />
              </Route>
              <Route path="/template-add" component={AddTemplate} />
              <Route path="/templates-list" component={TemplateList} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Form Builder</Footer>
      </Layout>
    </TemplateContextProvider>
  );
}

export default App;
