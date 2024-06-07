/* eslint-disable */
import React from "react";
import { forwardRef } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import ArrowDown from "../../../assets/icons/arrow-down-green.svg";

const customStyles = {
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#0083E5", // Custom colour
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "#0083E5" : "white",
    padding: 10,
    fontSize: "14px",
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "100%",
    height: 39,
    display: "flex",
    border: "1px solid rgb(165, 164, 164)",
    borderRadius: "7px",
    fontSize: "14px",
    fontFamily: "Montserrat, sans-serif",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div
        className="close-icon"
        style={{
          backgroundImage: `url(${ArrowDown})`,
          width: "20px",
          height: "20px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </components.DropdownIndicator>
  );
};

const SingleAsyncSelect = forwardRef(({ optionsArray, loadOptions, disabled, onChange, label, compulsory, className, outerClassName, outerStyle, value, multi, ...props }, ref) => {
  return (
    <div className={`${outerClassName} flex flex-col items-start input-container`} style={outerStyle}>
      {label && (
        <label className="flex w-full text-sm mb-2 capitalize">
          {label} {compulsory && <span className={"pl-2 text-red-500"}>*</span>}
        </label>
      )}

      <AsyncSelect
        defaultOptions={optionsArray}
        loadOptions={loadOptions}
        ref={ref}
        placeholder=""
        isMulti={multi}
        isDisabled={disabled}
        styles={customStyles}
        hideSelectedOptions
        className={`w-full ${className}`}
        value={value}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
        }}
        onChange={onChange}
        {...props}
      />
    </div>
  );
});

export default SingleAsyncSelect;
