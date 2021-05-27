import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatNumber } from "utils/functions";
import { FaCheck } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "styles/components/tabla_plans.css";

const TablePlansComponent = ({ plan, ...props }) => {
  const [displayDescription, setDisplayDescription] = useState(false);

  const handleSubmit = () => {};

  const handleUpdate = (e) => {
    e.preventDefault();
    props.handleUpdate(plan);
  };

  const displayTotalDiscount = (total) => {
    let discount = (parseFloat(plan.discount) * parseFloat(plan.price)) / 100;
    return formatNumber(parseFloat(plan.price) - discount, 2, ",", ".");
  };

  const handleSelect = (e) => {
    e.preventDefault();
    props.handleSelect(plan);
  };

  const displayDescriptionParagraph = () => {
    setDisplayDescription(!displayDescription);
  };

  return (
    <React.Fragment>
      {plan.especial ? (
        <div className="plan featured">
          <header>
            <h4 className="plan-title">{plan.name}</h4>
            <div className="plan-cost">
              <span
                className={
                  !plan.discount ? "plan-price" : "plan-price-discount"
                }
              >
                {props.configGeneral && props.configGeneral.simbolo_moneda
                  ? props.configGeneral.simbolo_moneda
                  : "$"}
                {formatNumber(plan.price, 2, ",", ".")}
              </span>
              {plan.discount ? (
                <React.Fragment>
                  <br />
                  <span className={"plan-price"}>
                    {props.configGeneral && props.configGeneral.simbolo_moneda
                      ? props.configGeneral.simbolo_moneda
                      : "$"}
                    {displayTotalDiscount(plan.price)}
                  </span>
                </React.Fragment>
              ) : (
                ""
              )}
              <span className="plan-type">
                <br />
                {plan.billing_period == 1
                  ? "Mensual"
                  : plan.billing_period + "-Meses"}
              </span>
            </div>
          </header>
          <ul className="plan-features">
            <li>
              <FaCheck /> Descripcion:
              {plan.description.length > 9 ? (
                <React.Fragment>
                  {!props.isModal ? (
                    <OverlayTrigger
                      placement={"bottom"}
                      overlay={
                        <Tooltip id={"tooltip-plan" + plan.id}>
                          <b>Descripción: </b>
                          <br />
                          {plan.description}
                        </Tooltip>
                      }
                    >
                      <span style={{ color: "rgb(228, 90, 59)" }}>
                        {" "}
                        Ver detalle
                      </span>
                    </OverlayTrigger>
                  ) : (
                    <React.Fragment>
                      <span
                        style={{ color: "rgb(228, 90, 59)" }}
                        onMouseOver={displayDescriptionParagraph}
                        onMouseLeave={displayDescriptionParagraph}
                      >
                        {" "}
                        Ver detalle
                      </span>
                      {displayDescription ? (
                        <p style={{ color: "white" }}>{plan.description}</p>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <span> {plan.description}</span>
              )}
            </li>
            <li>
              <FaCheck /> Descuento: {plan.discount}%
            </li>
            <li>
              <FaCheck /> Días de Prueba: {plan.day_test}
            </li>
          </ul>
          {props.update ? (
            <div className="plan-select">
              <a href="" onClick={handleUpdate}>
                Modificar <br /> O <br /> Eliminar
              </a>
            </div>
          ) : props.disabled ? (
            <span></span>
          ) : (
            <div className="plan-select" onClick={handleSelect}>
              <a href="">Seleccionar</a>
            </div>
          )}
        </div>
      ) : (
        <div className="plan">
          <header>
            <h4 className="plan-title">{plan.name}</h4>
            <div className="plan-cost">
              <span
                className={
                  !plan.discount ? "plan-price" : "plan-price-discount"
                }
              >
                {props.configGeneral && props.configGeneral.simbolo_moneda
                  ? props.configGeneral.simbolo_moneda
                  : "$"}
                {formatNumber(plan.price, 2, ",", ".")}
              </span>
              {plan.discount ? (
                <React.Fragment>
                  <br />
                  <span className={"plan-price"}>
                    {props.configGeneral && props.configGeneral.simbolo_moneda
                      ? props.configGeneral.simbolo_moneda
                      : "$"}
                    {displayTotalDiscount(plan.price)}
                  </span>
                </React.Fragment>
              ) : (
                ""
              )}
              <span className="plan-type">
                <br />
                {plan.billing_period == 1
                  ? "Mensual"
                  : plan.billing_period + "-Meses"}
              </span>
            </div>
          </header>
          <ul className="plan-features">
            <li>
              <FaCheck /> Descripcion:
              {plan.description.length > 9 ? (
                <React.Fragment>
                  {!props.isModal ? (
                    <OverlayTrigger
                      placement={"bottom"}
                      overlay={
                        <Tooltip id={"tooltip-plan" + plan.id}>
                          <b>Descripción: </b>
                          <br />
                          {plan.description}
                        </Tooltip>
                      }
                    >
                      <span style={{ color: "rgb(228, 90, 59)" }}>
                        {" "}
                        Ver detalle
                      </span>
                    </OverlayTrigger>
                  ) : (
                    <React.Fragment>
                      <span
                        style={{ color: "rgb(228, 90, 59)" }}
                        onMouseOver={displayDescriptionParagraph}
                        onMouseLeave={displayDescriptionParagraph}
                      >
                        {" "}
                        Ver detalle
                      </span>
                      {displayDescription ? (
                        <p style={{ color: "white" }}>{plan.description}</p>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <span> {plan.description}</span>
              )}
            </li>
            <li>
              <FaCheck /> Descuento: {plan.discount}%
            </li>
            <li>
              <FaCheck /> Días de Prueba: {plan.day_test}
            </li>
          </ul>
          {props.update ? (
            <div className="plan-select">
              <a href="" onClick={handleUpdate}>
                Modificar <br /> O <br /> Eliminar
              </a>
            </div>
          ) : props.disabled ? (
            <span></span>
          ) : (
            <div className="plan-select" onClick={handleSelect}>
              <a href="">Seleccionar</a>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

TablePlansComponent.defaultProps = {
  configGeneral: JSON.parse(sessionStorage.getItem("configGeneral")),
};

TablePlansComponent.propTypes = {
  plan: PropTypes.object.isRequired,
  stylePlan: PropTypes.object,
  disabled: PropTypes.bool,
  update: PropTypes.bool,
  handleUpdate: PropTypes.func,
  handleSelect: PropTypes.func,
  isModal: PropTypes.bool,
};

export default TablePlansComponent;
