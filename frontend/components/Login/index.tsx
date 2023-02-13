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
import { User, Key } from "@geist-ui/icons";

import styles from "./Login.module.css";
const LoginForm = () => {
  return (
    <div className={styles.loginContainer}>
      <Card shadow width="500px">
        <Card.Content>
          <Text b my={0}>
            Login
          </Text>
        </Card.Content>
        <Divider h="1px" my={0} />
        <Card.Content>
          <Input
            icon={<User />}
            placeholder="Enter email"
            width={"100%"}
            clearable
          >
            Username
          </Input>
          <Spacer h={0.5} />
          <Input.Password
            icon={<Key />}
            placeholder="Enter password"
            width={"100%"}
            clearable
          >
            Password
          </Input.Password>
          <Spacer h={1.5} />
          <div className={styles.footer}>
            <Button type="success" ghost auto>
              Login
            </Button>
            <Spacer h={1.5} />
            <div>
              Dont have an account?
              <Link block href="/signup">
                Signup
              </Link>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LoginForm;
