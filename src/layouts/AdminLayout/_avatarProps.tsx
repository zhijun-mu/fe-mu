import { Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import type { ProLayoutProps } from "@ant-design/pro-components";

const avatarProps: ProLayoutProps["avatarProps"] = {
  src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
  size: "small",
  title: "七妮妮",
  render: (_props, dom) => {
    return (
      <Dropdown
        menu={{
          items: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "退出登录",
            },
          ],
        }}
      >
        {dom}
      </Dropdown>
    );
  },
};

export default avatarProps;
