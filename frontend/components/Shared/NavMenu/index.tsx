import React from "react";
import { Button, Drawer } from "@geist-ui/core";
import X from "@geist-ui/icons/x";
import styles from "./styles.module.css";

interface NavItemsProps {
  isOpen: boolean | undefined;
  placement: "top" | "left" | "right" | "bottom" | undefined;
  onClose: Function;
}

const NavItems = ({ isOpen, placement, onClose }: NavItemsProps) => {
  return (
    <Drawer
      visible={isOpen as boolean}
      onClose={() => onClose()}
      placement={placement}
    >
      <div className={styles.header}>
        <Button
          iconRight={<X />}
          auto
          scale={2 / 3}
          px={0.6}
          type="error"
          ghost
          onClick={() => onClose()}
        ></Button>
      </div>

      <Drawer.Subtitle>This is a drawer</Drawer.Subtitle>
      <Drawer.Content>
        <p>Some content contained within the drawer.</p>
      </Drawer.Content>
    </Drawer>
  );
};

export default NavItems;
