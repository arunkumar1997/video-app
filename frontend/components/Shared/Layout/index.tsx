import React from "react";
import Styled from "./styles";
const AppLayout = (props: any) => {
  return <Styled.Layout>{props.children}</Styled.Layout>;
};

export default AppLayout;
