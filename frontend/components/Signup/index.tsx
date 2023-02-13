import React from "react";
import {
  Card,
  Text,
  Divider,
  Link,
  Input,
  Spacer,
  Button,
} from "@geist-ui/core";

import styles from "./Signup.module.css";
const SignupForm = () => {
  return (
    <div className={styles.signUpContainer}>
      <Card shadow width="500px">
        <Card.Content>
          <Text b my={0}>
            Signup
          </Text>
        </Card.Content>
        <Divider h="1px" my={0} />
        <Card.Content>
          <Input placeholder="Enter fullname" width={"100%"} clearable>
            Fullname
          </Input>
          <Spacer h={0.5} />

          <Input placeholder="Enter email" width={"100%"} clearable>
            Email
          </Input>
          <Spacer h={0.5} />
          <Input.Password placeholder="Enter password" width={"100%"} clearable>
            Password
          </Input.Password>
          <Spacer h={0.5} />
          <Input.Password
            placeholder="Confirm password"
            width={"100%"}
            clearable
          >
            Confirm password
          </Input.Password>
          <Spacer h={1.5} />
          <div className={styles.footer}>
            <Button type="success" ghost auto>
              Sign up
            </Button>
            <Spacer h={1.5} />
            <div>
              Already have an account?
              <Link block href="/login">
                Login
              </Link>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SignupForm;
