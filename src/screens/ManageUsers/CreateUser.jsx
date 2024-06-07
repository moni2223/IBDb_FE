import React, { useEffect } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import _ from "lodash";
import { validations } from "../Authentication/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getRoles, registerRequest } from "../../actions";
import { UsersForm } from "../../components/Forms/UsersForm";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = useSelector(({ general }) => general?.roles) || [];

  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(validations.register),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) Object.keys(errors).map((key) => toast.error(errors?.[key]?.message));
  }, [errors]);

  const handleCreate = (e) => {
    dispatch(
      registerRequest({
        ...e,
        onSuccess: (res) => {
          toast.success("User created successfully!");
          navigate(-1);
        },
      })
    );
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">New user</h2>
        </div>
        <Inputs.Button text="Create" className={"h-9 !w-[150px] mr-3"} selected onClick={handleSubmit((e) => handleCreate(e))} />
      </div>
      <UsersForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} roles={roles} />
    </div>
  );
};

export default CreateUser;
