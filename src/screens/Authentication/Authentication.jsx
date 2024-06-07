import React, { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validations } from "./validations";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import "./styles.scss";
import { Login } from "./Login";
import { Register } from "./Register";
import { getRoles, loginRequest, registerRequest } from "../../actions";
const Authentication = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tab = "login", handleUrlChange } = useQuery();
  const roles = useSelector(({ general }) => general?.roles) || [];

  const methods = useForm({ shouldUnregister: false, resolver: yupResolver(tab === "login" ? validations.login : validations.register), mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) Object.keys(errors).map((key) => toast.error(errors?.[key]?.message));
  }, [errors]);

  const handleLogin = handleSubmit((e) => {
    dispatch(
      loginRequest({
        ...e,
        onSuccess: (res) => {
          console.log(res);
          //   handleUrlChange({ tab: "login" });
          reset();
        },
      })
    );
  });
  const handleRegister = handleSubmit((e) => {
    dispatch(
      registerRequest({
        ...e,
        onSuccess: (res) => {
          toast.success("Registration successfully!");
          handleUrlChange({ tab: "login" });
          reset();
        },
      })
    );
  });

  console.log(watch());

  return (
    <div className="login-container">
      <div className={`flex flex-col items-center ${window.innerWidth < 1500 ? "h-[92%]" : "h-5/6"} ${tab === "register" ? "w-1/2" : "w-1/3"} bg-white rounded-md`}>
        <div className="logo my-1" />
        {tab === "login" ? <Login watch={watch} handleUrlChange={handleUrlChange} handleLogin={handleLogin} errors={errors} register={register} reset={reset} /> : <Register watch={watch} handleUrlChange={handleUrlChange} handleRegister={handleRegister} errors={errors} register={register} control={control} setValue={setValue} roles={roles} reset={reset} />}
      </div>
    </div>
  );
};
export default Authentication;
