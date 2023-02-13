import React from "react";
import { useRouter } from "next/router";
import { Menu, Home, Grid } from "@geist-ui/icons";
import { Tabs } from "@geist-ui/core";
import styles from "./styles.module.css";
import NavItems from "../NavMenu";

const Header = (props: any) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState<string>("1");
  const links: Object[] = [
    { value: "1", link: "/home" },
    { value: "2", link: "/rooms" },
  ];

  const router = useRouter();
  const updateMenuState = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const getLink = (val: string) => {
    return links.filter((link: any) => link.value == val);
  };

  const onClose = () => {
    updateMenuState(false);
  };

  const onTabsChange = (val: string) => {
    setSelectedTab(val);
    const [tab]: any = getLink(val);
    const currentPath = getCurrentPath();
    if (currentPath == tab.link) return;
    router.push(tab.link);
  };

  function setActive() {
    const url = new URL(window.location.href);
    const pathname = url.pathname.split("/")[1];
    const [currentPath]: any = links.filter(
      (l: any) => l.link === `/${pathname}`
    );
    if (currentPath) {
      setSelectedTab(currentPath.value);
    }
  }

  function getCurrentPath() {
    const url = new URL(window.location.href);
    const pathname = url.pathname.split("/")[1];
    const [currentPath]: any = links.filter(
      (l: any) => l.link === `/${pathname}`
    );
    if (currentPath) {
      return currentPath.link;
    }
    return null;
  }

  React.useEffect(() => {
    setActive();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.appHeader}>
        {false ? (
          <div className={styles.menuWrapper}>
            <Menu size={32} onClick={() => updateMenuState(true)} />
          </div>
        ) : (
          <div className={styles.menuWrapper}>
            <div className={styles.menu}>
              <div className={styles.logo}>Logo</div>
              <Tabs
                align="center"
                leftSpace={0}
                hideDivider
                hideBorder
                value={selectedTab}
                onChange={onTabsChange}
              >
                <Tabs.Item
                  label={
                    <>
                      <Home /> Home
                    </>
                  }
                  value="1"
                ></Tabs.Item>
                <Tabs.Item
                  label={
                    <>
                      <Grid /> All rooms{" "}
                    </>
                  }
                  value="2"
                ></Tabs.Item>
              </Tabs>
              <div className={styles.profile}>Profile</div>
            </div>
          </div>
        )}
      </div>
      <NavItems isOpen={isMenuOpen} placement="left" onClose={onClose} />
    </div>
  );
};

export default Header;
