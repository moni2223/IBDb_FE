import React, { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validations } from "./validations";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./styles.scss";

export const Register = ({ watch, handleUrlChange, handleRegister, register, control, setValue, errors, roles, reset }) => {
  const [checkPassword, setCheckPassword] = useState(false);
  return (
    <>
      {" "}
      <div className="flex items-center font-bold text-2xl uppercase text-center">Get started on IBDb today</div>
      <p className="font-normal text-sm text-center my-6 text-center">Please enter your information in order to register</p>
      <div className="flex flex-col justify-between items-center h-1/2 w-full">
        <div className="flex flex-col w-full items-center gap-2">
          <div className="flex flex-wrap w-full justify-center gap-2 p-4">
            <Inputs.TextInput label={"Full name"} inputClassName={errors.fullName && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`fullName`, { shouldValidate: true })} />
            <Inputs.TextInput label={"Email"} inputClassName={errors.email && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`email`, { shouldValidate: true })} />
            <Inputs.TextInput label={"Username"} inputClassName={errors.userName && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`userName`, { shouldValidate: true })} />
            <Inputs.TextInput label={"Password"} autoComplete="new-password" inputClassName={errors.password && "failed"} password={!checkPassword} compulsory outerClassName={`w-[350px]`} suffix={<div className={`icon see-password ${checkPassword && "unsee"} w-6 h-6 mr-3`} onClick={() => setCheckPassword(!checkPassword)} />} {...register(`password`, { shouldValidate: true })} />
            <Controller
              control={control}
              name={`role`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                  <Inputs.SingleAsyncSelect
                    label="Role"
                    outerClassName={`!bg-white ${window.innerWidth < 1500 ? "!w-[350px]" : "!w-[710px]"}`}
                    value={value}
                    optionsArray={
                      roles &&
                      roles
                        ?.filter((role) => role?.roleName !== "admin")
                        ?.map((role) => {
                          return {
                            label: role?.roleName?.toUpperCase(),
                            value: role,
                          };
                        })
                    }
                    onChange={(e) => {
                      setValue("role", e);
                      setValue("roleName", e?.value?.roleName);
                    }}
                    className={error && "failed"}
                  />
                </>
              )}
              rules={{ required: true }}
            />
          </div>
          <Inputs.Button text={"Register"} selected className={`w-5/6 mb-2`} onClick={handleRegister} />
          <p className="font-medium">
            Already registered?{" "}
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => {
                reset();
                handleUrlChange({ tab: "login" });
              }}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
