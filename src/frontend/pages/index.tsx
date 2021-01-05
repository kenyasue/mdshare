import { Layout, Row, Col, Input, Button, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
import {
  PlusOutlined,
  FileAddOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const { SubMenu } = Menu;

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Home() {
  return (
    <>
      <Row className="header">
        <Col span={24} className="padding-1">
          header
        </Col>
      </Row>
      <Row className="content">
        <Col span={6} className="sider">
          <Row className="sider-header">
            <Col span={24} className="padding-left-1 ">
              <Search
                placeholder="input search text"
                style={{ width: "calc(100% - 108px)" }}
              />
              <Button
                type="primary"
                icon={<FolderAddOutlined />}
                style={{ width: 48, marginLeft: 6 }}
                size="middle"
              />

              <Button
                type="primary"
                icon={<FileAddOutlined />}
                style={{ width: 48, marginLeft: 6 }}
                size="middle"
              />
            </Col>
          </Row>
          <Row className="sider-menu">
            <Col span={24}>
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Col>
        <Col span={18} className="padding-1 main">
          <Input
            placeholder="Please write title here"
            className="title-input"
          />
        </Col>
      </Row>
      <Row className="footer">
        <Col span={24} className="padding-1">
          footer
        </Col>
      </Row>
    </>
  );
}
