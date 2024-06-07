import React, { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import _ from "lodash";
import { Controller } from "react-hook-form";

export const BookForm = ({ errors, control, setValue, genres, register }) => {
  return (
    <div className="body-container !flex !flex-wrap !gap-7" style={{ height: "unset" }}>
      <Inputs.TextInput label={"Title"} inputClassName={errors.title && "failed"} compulsory outerClassName={`w-[23%]`} {...register(`title`, { shouldValidate: true })} />
      <Inputs.TextInput label={"Cover"} inputClassName={errors.cover && "failed"} outerClassName={`w-[23%]`} {...register(`cover`)} />
      <Inputs.TextInput label={"Price"} number inputClassName={errors.price && "failed"} compulsory outerClassName={`w-[23%] h-[100px]`} {...register(`price`, { valueAsNumber: true, shouldValidate: true })} />
      {genres && (
        <Controller
          control={control}
          name={`genres`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Inputs.SingleAsyncSelect
                label="Genres"
                outerClassName={`!bg-white !w-[23%]`}
                value={value}
                multi
                compulsory
                optionsArray={
                  genres &&
                  genres?.map((genre) => {
                    return {
                      label: genre?.name,
                      value: genre,
                    };
                  })
                }
                onChange={(e) => {
                  setValue("genres", e);
                  setValue(
                    "genreIds",
                    e?.map(({ value }) => value?.id)
                  );
                }}
                className={error && "failed"}
              />
            </>
          )}
          rules={{ required: true }}
        />
      )}
      <Inputs.TextAreaInput label={"Short description"} inputClassName={`!h-[250px] ${errors.description && "failed"}`} compulsory outerClassName={`w-full !h-[250px]`} {...register(`description`, { shouldValidate: true })} />
    </div>
  );
};
