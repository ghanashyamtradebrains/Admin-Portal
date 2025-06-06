"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { postLoginData } from "@/api/fetchClient";
import { setAuth } from "@/redux/reducer/authSlice";
import Logo from "../assets/logo/logo.png";
import styles from "./page.module.css";

function Login() {
  const [apiLoader, setApiLoader] = useState(false);
  const [apiError, setApiError] = useState();
  const [form] = Form.useForm();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    setApiLoader(true);
    try {
      await postLoginData(values).then((resp) => {
        if (resp?.status === 200) {
          navigate.push("/dashboard");
        }
        console.log(resp, "respresp");

        cookie.set("user_data", resp?.data.user?.accountType, { expires: 999 });
        cookie.set("login_session", "true", { expires: 999 });
        cookie.set("ptl_access_token", resp?.data?.access_token, {
          expires: 999,
        });
        dispatch(setAuth(resp.data));

        setApiLoader(false);
      });
    } catch (error) {
      if (error !== undefined) {
        const errorMsg = Object?.values(error?.response?.data);
        setApiError(errorMsg[0]);
        setApiLoader(false);
      }
    }
  };

  return (
    <div>
      <div
        className={`table-shadow w-100
        `}
        style={{
          width: "500px",
          textAlign: "center",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="">
          <Image src={Logo} alt="Portal Icon" />
          <h3 className="mt-20">Login</h3>
          <p className="mt-20 mb-20">Login to access dashboard</p>
        </div>
        <div className="w-100">
          <Form
            autoComplete="off"
            form={form}
            name="login"
            onFinish={onSubmit}
            scrollToFirstError
          >
            <Form.Item
              style={{ margin: "15px 0px " }}
              name="email"
              className={`dark-input-login
                        `}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please Enter your E-mail!",
                },
              ]}
            >
              <Input
                type="text"
                //   height={"50px"}
                style={{ height: "40px" }}
                className={`
                          auth-form-input`}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                type="text"
                style={{ height: "40px" }}
                placeholder="Enter Password"
              />
            </Form.Item>
            {apiError && (
              <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                {apiError}
              </div>
            )}

            {apiLoader ? (
              <button className={styles.login_button}>Logging in....</button>
            ) : (
              <button type="submit" className={styles.login_button}>
                Login
              </button>
            )}
            {/* )} */}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
