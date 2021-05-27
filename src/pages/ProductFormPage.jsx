import React, { useEffect } from "react";
import { toast } from "react-toastify";
import layoutHelpers from "shared/layouts/helpers";
import FormProductSale from "components/FormProductSale";

const ProductFormPage = (props) => {
  useEffect(() => {
    if (sessionStorage.getItem("configStore")) {
      layoutHelpers.toggleCollapsed();
      return () => {
        layoutHelpers.toggleCollapsed();
      };
    } else {
      toast.error("Error, debe hacer su configuración de empresa");
      props.history.replace("/config/config_store");
    }
  }, []);

  return (
    <FormProductSale
      {...props}
      handleSubmitProduct={() => {}}
      isInventary={true}
    />
  );
};

export default ProductFormPage;
