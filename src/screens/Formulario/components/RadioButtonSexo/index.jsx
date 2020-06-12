import React from "react";
import { Field } from "react-final-form";

export const RadioButtonSexo = (props) => {
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
            onFocus={(e) => e.relatedTarget &&
              e.relatedTarget.nodeName === "BUTTON" &&
              window.scrollBy(0, -30)}
            value="M"
          />{" "}
          Masculino
        </label>
        <label className="ml-3">
          <Field
            name={name}
            component="input"
            type="radio"
            required={required}
            onFocus={(e) => e.relatedTarget &&
              e.relatedTarget.nodeName === "BUTTON" &&
              window.scrollBy(0, -30)}
            value="F"
          />{" "}
          Feminino
        </label>
      </div>
    </div>
  );
};
