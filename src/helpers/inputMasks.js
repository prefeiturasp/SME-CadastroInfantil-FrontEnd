import { createTextMask } from "redux-form-input-masks";

export const fieldCep = createTextMask({
  pattern: "99999-999",
  allowEmpty: false,
  guide: true,
  stripMask: false,
});
