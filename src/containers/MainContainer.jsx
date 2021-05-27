import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "styles/AuthStyle.css";
import { login, logout } from "actions/auth";
import { resetCart } from "actions/cart";
import Layout1 from "shared/layouts/Layout1";
import { setMenu, removeMenu } from "actions/menu";
import { setConfigStore, setConfig, removeConfig } from "actions/configs";
import { setVideos, cleanVideos } from "actions/videoTutorial";
import {
  setEnterprises,
  setBranchOffices,
  removeData,
  setIdEnterprise,
  setIdBranchOffice,
} from "actions/enterpriseSucursal";
import { API_URL } from "utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { setAuthorizationToken } from "utils/functions";
import axios from "axios";
import LoadingComponent from "components/LoadingComponent";

let intervalTokenRefresh = null;

const MainContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!props.isLogin) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("configStore");
      sessionStorage.removeItem("configGeneral");
      sessionStorage.removeItem("cash_register");
      sessionStorage.removeItem("id_enterprise");
      sessionStorage.removeItem("id_branch_office");
      setAuthorizationToken(null);
      props.removeMenu();
      props.removeData();
      props.removeConfig();
    }
  }, [props.isLogin]);

  const fetchData = async () => {
    if (props.isLogin) {
      if (props.menu.length === 0) {
        setIsLoading(true);
        let promises = [
          axios.get(API_URL + "config_general/" + 1),
          axios.get(API_URL + "config_store"),
          axios.get(API_URL + "videoTutorial"),
          axios.get(API_URL + "menu_user"),
        ];

        if (props.userSession.id_rol === 2 || props.userSession.id_rol === 9) {
          promises.push(
            axios.get(API_URL + "enterprises_branch_office") // petición para traer las empresas y las sucursales a los dueños de empresas
          );
        }

        try {
          let response = await Promise.all(promises);
          sessionStorage.setItem(
            "configGeneral",
            JSON.stringify(response[0].data)
          );
          sessionStorage.setItem(
            "configStore",
            JSON.stringify(response[1].data)
          );
          props.setConfig(response[0].data);
          props.setConfigStore(response[1].data);
          props.setVideos(response[2].data);
          props.setMenu(response[3].data);
          if (sessionStorage.getItem("id_enterprise")) {
            props.setIdEnterprise(sessionStorage.getItem("id_enterprise"));
          }
          if (sessionStorage.getItem("id_branch_office")) {
            props.setIdBranchOffice(sessionStorage.getItem("id_branch_office"));
          }
          if (response.length > 4) {
            props.setEnterprises(response[4].data.enterprises);
            props.setBranchOffices(response[4].data.branchOffices);
          }

          tokenRefreshIntervalHandler(response[0].data);
          setIsLoading(false);
        } catch (e) {
          logoutUserByTokenExpired(e);
        }
      }
    }
  };

  const tokenRefreshIntervalHandler = (config) => {
    if (config.is_syncronized) {
      intervalTokenRefresh = window.setInterval(() => {
        axios
          .get(API_URL + "refreshTokenNuxo")
          .then((result) => {
            if (result.data.token) {
              sessionStorage.setItem("token", result.data.token);
              setAuthorizationToken(result.data.token);
            } else {
              console.log("user no registrado en nuxo");
            }
          })
          .catch((err) => {
            console.log(err, "error actualizando el token");
          });
      }, 1000 * 60 * 30);
    }
  };

  const handleLogoutUser = async () => {
    props.logout();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("configStore");
    sessionStorage.removeItem("configGeneral");
    sessionStorage.removeItem("cash_register");
    sessionStorage.removeItem("id_enterprise");
    sessionStorage.removeItem("id_branch_office");
    setAuthorizationToken(null);
    props.removeMenu();
    props.resetCart();
    props.removeData();
    props.removeConfig();
    window.clearInterval(intervalTokenRefresh);
  };

  const logoutUserByTokenExpired = (err) => {
    if (err.response) {
      toast.error(err.response.data.message);
      if (err.response.status === 400) {
        setTimeout(() => {
          handleLogoutUser();
        }, 1500);
      } else {
        toast.error(err.response.data.message);
      }
    } else {
      console.log(err);
      toast.error("Error contacte con soporte");
    }
  };

  if (props.isLogin) {
    return (
      <>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <Layout1
            {...props}
            menuUser={props.menu}
            logoutUser={handleLogoutUser}
            logoutByToken={logoutUserByTokenExpired}
          >
            {React.cloneElement(props.children, {
              tokenExpired: logoutUserByTokenExpired,
            })}
            <ToastContainer />
          </Layout1>
        )}
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

MainContainer.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  resetCart: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  removeMenu: PropTypes.func.isRequired,
  menu: PropTypes.array.isRequired,
  setEnterprises: PropTypes.func.isRequired,
  setBranchOffices: PropTypes.func.isRequired,
  removeData: PropTypes.func.isRequired,
  setIdEnterprise: PropTypes.func.isRequired,
  setIdBranchOffice: PropTypes.func.isRequired,
  setConfigStore: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  removeConfig: PropTypes.func.isRequired,
  setVideos: PropTypes.func,
  cleanVideos: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isLogin: state.auth.isAuthenticated,
    userSession: state.auth.user,
    menu: state.menu.modules,
    configs: state.configs,
    enterpriseSucursal: state.enterpriseSucursal,
  };
}

function mapDispatchToProps() {
  return {
    login,
    logout,
    resetCart,
    setMenu,
    removeMenu,
    setEnterprises,
    setBranchOffices,
    removeData,
    setIdEnterprise,
    setIdBranchOffice,
    setConfigStore,
    setConfig,
    removeConfig,
    setVideos,
    cleanVideos,
  };
}

export default connect(mapStateToProps, mapDispatchToProps())(MainContainer);
