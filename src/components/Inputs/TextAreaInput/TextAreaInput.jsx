/* eslint-disable */
import React from "react";
import "./styles.scss";
import { forwardRef } from "react";

const TextAreaInput = forwardRef(({ outerStyle, outerClassName, inputClassName, inputStyle, label, compulsory, disabled, suffix, chatFont, ...props }, ref) => {
  return (
    <div className={`${outerClassName} flex flex-col items-start input-container`} style={outerStyle}>
      {label && (
        <label className="flex w-full text-sm mb-2 capitalize">
          {label} {compulsory && <span className={"pl-2 text-black"}>*</span>}
        </label>
      )}

      <div className={` flex items-center rounded-md h-10 w-full prefix-input-container ${disabled && "bg-[#F8F8F8]"} ${inputClassName}`} style={inputStyle}>
        <textarea className={`border-none resize-none outline-none px-2 h-9/10 w-full rounded-md ${chatFont}`} disabled={disabled} {...props} ref={ref} />
        {suffix && suffix}
      </div>
    </div>
  );
});

export default TextAreaInput;
