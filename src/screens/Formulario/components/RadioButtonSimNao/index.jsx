import React from "react";
import { Field } from "react-final-form";

export const RadioButtonSimNao = (props) => {
  const { required, label, name, onClickSim } = props;
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
            onFocus={(e) =>
              e.relatedTarget &&
              e.relatedTarget.nodeName === "BUTTON" &&
              window.scrollBy(0, -30)
            }
            required
            value="S"
            onClick={(e) => onClickSim && onClickSim(e)}
          />{" "}
          Sim
        </label>
        <label className="ml-3">
          <Field
            name={name}
            component="input"
            type="radio"
            onFocus={(e) =>
              e.relatedTarget &&
              e.relatedTarget.nodeName === "BUTTON" &&
              window.scrollBy(0, -30)
            }
            required={required}
            value="N"
          />{" "}
          Não
        </label>
      </div>
    </div>
  );
};
