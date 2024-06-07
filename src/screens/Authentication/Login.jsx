import React, { useState } from "react";
import Inputs from "../../components/Inputs";
import "./styles.scss";

export const Login = ({ watch, handleUrlChange, handleLogin, errors, register, reset }) => {
  const [checkPassword, setCheckPassword] = useState(false);
  return (
    <>
      <div className="flex items-center font-bold text-2xl uppercase">Log in to your account</div>
      <p className="font-normal text-sm text-center my-6">Please enter your credentials</p>
      <div className="flex flex-col justify-between items-center h-1/2 w-full">
        <div className="w-full flex flex-col items-center gap-3">
          <Inputs.TextInput label={"Email"} autoComplete="new-password" inputClassName={errors.email && "failed"} compulsory outerClassName={`w-5/6`} {...register(`email`, { shouldValidate: true })} />
          <Inputs.TextInput label={"Password"} autoComplete="new-password" inputClassName={errors.password && "failed"} password={!checkPassword} compulsory outerClassName={`w-5/6`} suffix={<div className={`icon see-password ${checkPassword && "unsee"} w-6 h-6 mr-3`} onClick={() => setCheckPassword(!checkPassword)} />} {...register(`password`, { shouldValidate: true })} />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <Inputs.Button text={"Login"} selected className={`w-5/6 mb-2`} onClick={handleLogin} />
          <p className="font-medium">
            New to IBDb?{" "}
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => {
                reset();
                handleUrlChange({ tab: "register" });
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
