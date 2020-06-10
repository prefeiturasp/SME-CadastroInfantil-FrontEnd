import React from "react";
import { Field } from "react-final-form";

export const RadioButtonGenerico = (props) => {
  const { required, label, name, options } = props;
  return (
    <div>
      <label>
        {required && <span>* </span>}
        {label}
      </label>
      <div>
        {options.map((option, key) => {
          return (
            <label className={key > 0 && "ml-3"}>
              <Field
                key={key}
                name={name}
                component="input"
                type="radio"
                required={required}
                value={(key + 1).toString()}
              />{" "}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};
