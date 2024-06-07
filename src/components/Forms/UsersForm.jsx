import React, { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import _ from "lodash";
import { Controller } from "react-hook-form";

export const UsersForm = ({ errors, control, setValue, roles, register }) => {
  const [checkPassword, setCheckPassword] = useState(false);
  return (
    <div className="body-container !flex !flex-wrap !gap-7" style={{ height: "unset" }}>
      <Inputs.TextInput label={"Full name"} inputClassName={errors.fullName && "failed"} compulsory outerClassName={`w-[22%]`} {...register(`fullName`, { shouldValidate: true })} />
      <Inputs.TextInput label={"Email"} inputClassName={errors.email && "failed"} compulsory outerClassName={`w-[22%]`} {...register(`email`, { shouldValidate: true })} />
      <Inputs.TextInput label={"Username"} inputClassName={errors.userName && "failed"} compulsory outerClassName={`w-[22%]`} {...register(`userName`, { shouldValidate: true })} />
      <Inputs.TextInput label={"Password"} autoComplete="new-password" inputClassName={errors.password && "failed"} password={!checkPassword} compulsory outerClassName={`w-[22%]`} suffix={<div className={`icon see-password ${checkPassword && "unsee"} w-6 h-6 mr-3`} onClick={() => setCheckPassword(!checkPassword)} />} {...register(`password`, { shouldValidate: true })} />
      <Controller
        control={control}
        name={`role`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Inputs.SingleAsyncSelect
              label="Role"
              outerClassName={`!bg-white !w-full`}
              value={value}
              optionsArray={
                roles &&
                roles?.map((role) => {
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
  );
};
