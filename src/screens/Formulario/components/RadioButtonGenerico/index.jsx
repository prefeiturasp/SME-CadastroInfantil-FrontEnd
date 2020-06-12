import React, { Fragment } from "react";
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
            <Fragment>
              {key === 3 && <br className="d-block d-sm-none" />}
              <label className={"mr-3"}>
                <Field
                  key={key}
                  name={name}
                  component="input"
                  type="radio"
                  required={required}
                  onFocus={(e) => e.relatedTarget &&
              e.relatedTarget.nodeName === "BUTTON" &&
              window.scrollBy(0, -30)}
                  value={(key + 1).toString()}
                />{" "}
                {option}
              </label>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
