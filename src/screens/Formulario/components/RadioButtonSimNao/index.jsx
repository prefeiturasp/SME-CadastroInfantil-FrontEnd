import React from "react";
import { Field } from "react-final-form";

export const RadioButtonSimNao = (props) => {
  const { required, label, name } = props;
  return (
    <div>
      <label>
        {required && <span>* </span>}
        {label}
      </label>
      <div>
        <label>
          <Field
            name={name}
            component="input"
            type="radio"
            required
            value="true"
          />{" "}
          Sim
        </label>
        <label className="ml-3">
          <Field
            name={name}
            component="input"
            type="radio"
            required={required}
            value="false"
          />{" "}
          Não
        </label>
      </div>
    </div>
  );
};
