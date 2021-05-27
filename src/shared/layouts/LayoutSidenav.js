import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidenav from "../../vendor/libs/sidenav";
import layoutHelpers from "./helpers";

const LayoutSidenav = (props) => {
  const layoutSidenavClasses = () => {
    let bg = props.sidenavBg;

    if (
      props.orientation === "horizontal" &&
      (bg.indexOf(" sidenav-dark") !== -1 ||
        bg.indexOf(" sidenav-light") !== -1)
    ) {
      bg = bg
        .replace(" sidenav-dark", "")
        .replace(" sidenav-light", "")
        .replace("-darker", "")
        .replace("-dark", "");
    }

    return (
      `bg-${bg} ` +
      (props.orientation !== "horizontal"
        ? "layout-sidenav"
        : "layout-sidenav-horizontal container-p-x flex-grow-0")
    );
  };

  const toggleSidenav = (e) => {
    e.preventDefault();
    layoutHelpers.toggleCollapsed();
  };

  const isMenuActive = (url) => {
    return props.location.pathname.indexOf(url) === 0;
  };

  const isMenuOpen = (url) => {
    return (
      props.location.pathname.indexOf(url) === 0 &&
      props.orientation !== "horizontal"
    );
  };

  return (
    <Sidenav orientation={props.orientation} className={layoutSidenavClasses()}>
      {/* Inner */}
      <div
        className={`sidenav-inner ${
          props.orientation !== "horizontal" ? "py-1" : ""
        }`}
      >
        <Sidenav.RouterLink to={"/dashboard"} icon="ion ion-md-speedometer">
          Escritorio
        </Sidenav.RouterLink>
        {props.menuUser.map((v, i) => {
          if (v.subnivel) {
            return (
              <Sidenav.Menu
                key={i}
                icon={v.icon}
                linkText={v.name_item}
                active={isMenuActive(v.route)}
                open={isMenuOpen(v.route)}
              >
                {v.sub_menu.map((v2, i2) => {
                  if (v2.subnivel) {
                    return (
                      <Sidenav.Menu
                        key={i2 + "sub_menu"}
                        linkText={v2.name_sub}
                        active={isMenuActive(v2.route)}
                        open={isMenuOpen(v2.route)}
                      >
                        {v2.sub_sub_menu.map((v3, i3) => (
                          <Sidenav.RouterLink
                            to={v3.route}
                            key={i3 + "sub_sub_menu"}
                          >
                            {v3.name_sub_sub}
                          </Sidenav.RouterLink>
                        ))}
                      </Sidenav.Menu>
                    );
                  } else {
                    return (
                      <Sidenav.RouterLink to={v2.route} key={i2 + "sub_menu"}>
                        {v2.name_sub}
                      </Sidenav.RouterLink>
                    );
                  }
                })}
              </Sidenav.Menu>
            );
          } else {
            return (
              <Sidenav.RouterLink icon={v.icon} key={i} to={v.route}>
                {v.name_item}
              </Sidenav.RouterLink>
            );
          }
        })}
      </div>
    </Sidenav>
  );
};

LayoutSidenav.propTypes = {
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

LayoutSidenav.defaultProps = {
  orientation: "vertical",
};

export default connect((store) => ({
  sidenavBg: store.theme.sidenavBg,
  menuUser: store.menu.modules,
}))(LayoutSidenav);
