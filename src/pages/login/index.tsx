import { type CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from "@ant-design/pro-components";
import { Space, Tabs, message, theme, Alert } from "antd";

import { passwordLogin, getLoginInfo } from "@/api/auth.ts";
import { useAuthStore } from "@/stores";
import { AppError } from "@/errors";

import styles from "./index.module.css";

type LoginType = "password" | "email";

export default function LoginPage() {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>("password");
  const { isAuthenticated, setToken, setUserInfo } = useAuthStore.getState();
  const [errMessage, setErrMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    setErrMessage(null);
    try {
      const data: any =
        loginType === "password" ? await passwordLogin(values) : await passwordLogin(values);

      const token = data.token;
      setToken(token);

      const info = await getLoginInfo();
      setUserInfo(info);

      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof AppError) {
        setErrMessage(err.message);
      } else {
        setErrMessage("未知错误！");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className={styles.container}>
        <div style={{ flex: 1, padding: "32px 0" }}>
          <LoginForm
            logo="https://github.githubassets.com/favicons/favicon.png"
            title="Github"
            subTitle="全球最大的代码托管平台"
            actions={
              <Space>
                其他登录方式
                <AlipayCircleOutlined style={iconStyles} />
                <TaobaoCircleOutlined style={iconStyles} />
                <WeiboCircleOutlined style={iconStyles} />
              </Space>
            }
            loading={loading}
            onFinish={handleFinish}
          >
            <Tabs
              centered
              items={[
                {
                  key: "password",
                  label: "账号密码登录",
                },
                {
                  key: "email",
                  label: "邮箱登录",
                },
              ]}
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            />

            {!!errMessage && (
              <Alert
                style={{
                  marginBottom: 24,
                }}
                title={errMessage}
                type="error"
                showIcon
              />
            )}

            {loginType === "password" && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined className={"prefixIcon"} />,
                  }}
                  placeholder={"用户名"}
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名!",
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined className={"prefixIcon"} />,
                    strengthText:
                      "Password should contain numbers, letters and special characters, at least 8 characters long.",
                    statusRender: (value) => {
                      const getStatus = () => {
                        if (value && value.length > 12) {
                          return "ok";
                        }
                        if (value && value.length > 6) {
                          return "pass";
                        }
                        return "poor";
                      };
                      const status = getStatus();
                      if (status === "pass") {
                        return <div style={{ color: token.colorWarning }}>强度：中</div>;
                      }
                      if (status === "ok") {
                        return <div style={{ color: token.colorSuccess }}>强度：强</div>;
                      }
                      return <div style={{ color: token.colorError }}>强度：弱</div>;
                    },
                  }}
                  placeholder={"密码"}
                  rules={[
                    {
                      required: true,
                      message: "请输入密码！",
                    },
                  ]}
                />
              </>
            )}
            {loginType === "email" && (
              <>
                <ProFormText
                  fieldProps={{
                    size: "large",
                    prefix: <MobileOutlined className={"prefixIcon"} />,
                  }}
                  name="mobile"
                  placeholder={"手机号"}
                  rules={[
                    {
                      required: true,
                      message: "请输入手机号！",
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: "手机号格式错误！",
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined className={"prefixIcon"} />,
                  }}
                  captchaProps={{
                    size: "large",
                  }}
                  placeholder={"请输入验证码"}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${"获取验证码"}`;
                    }
                    return "获取验证码";
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码！",
                    },
                  ]}
                  onGetCaptcha={async () => {
                    message.success("获取验证码成功！验证码为：1234");
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: "right",
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </div>
    </>
  );
}
