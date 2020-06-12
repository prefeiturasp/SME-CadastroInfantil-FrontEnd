import ptBR from "date-fns/locale/pt-BR";
import PropTypes from "prop-types";
import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { HelpText } from "../HelpText";
import InputErroMensagem from "../Input/InputErroMensagem";

export class InputComData extends Component {
  // Thanks community :D
  // https://github.com/Hacker0x01/react-datepicker/issues/543

  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.bool,
    }),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    dateFormat: PropTypes.string,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    placeholder: "",
    dateFormat: "DD/MM/YYYY",
    disabled: false,
    fullScreen: false,
    inline: false,
    hasIcon: false,
    showHelpText: true,
  };

  handleChange = (date) => {
    this.props.input.onChange(
      moment(date).format(this.props.dateFormat || this.defaultProps.dateFormat)
    );
  }

  openDatepicker = () => {
    this._calendar.setOpen(true);
    this._calendar.setFocus();
  };

  dataSelecionada(data) {
    if (data.length !== 0) {
      return moment(data, "DD/MM/YYYY")["_d"];
    } else {
      return null;
    }
  }

  render() {
    const {
      className,
      dateFormat,
      disabled,
      fullScreen,
      hasIcon,
      helpText,
      inline,
      input,
      label,
      labelClassName,
      maxDate,
      meta,
      minDate,
      name,
      placeholder,
      required,
      showMonthDropdown,
      showYearDropdown,
      showHelpText,
    } = this.props;
    return (
      <div className="datepicker">
        {label && [
          required && (
            <span key={1} className="required-asterisk">
              *
            </span>
          ),
          <label
            key={2}
            htmlFor={name}
            className={`col-form-label ${labelClassName}`}
          >
            {label}
          </label>,
        ]}
        <div>
          <DatePicker
            {...input}
            placeholderText={placeholder}
            showMonthDropdown={showMonthDropdown}
            showYearDropdown={showYearDropdown}
            dateFormat={dateFormat}
            isClearable={true}
            withPortal={fullScreen}
            inline={inline}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            onFocus={(e) => e.relatedTarget &&
              e.relatedTarget.nodeName === "BUTTON" &&
              window.scrollBy(0, -30)}
            selected={this.dataSelecionada(input.value)}
            className={`form-control ${className} ${
              meta.touched && meta.error && "invalid-field"
            }`}
            ref={(c) => (this._calendar = c)}
            onChange={(value) => this.handleChange(value)}
            locale={ptBR}
            name={name}
            required={required}
          />
          {hasIcon && (
            <i onClick={this.openDatepicker} className="fas fa-calendar-alt" />
          )}
        </div>
        {showHelpText && <HelpText helpText={helpText} />}
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
