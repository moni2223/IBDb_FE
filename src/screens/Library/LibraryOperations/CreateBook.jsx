import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createBook, getGenres } from "../../../actions";
import { BookForm } from "../../../components/Forms/BookForm";
import { validations } from "./validations";
import { User } from "../../../utilities/User";

const CreateBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genres = useSelector(({ library }) => library?.genres) || [];
  const currentUserId = useSelector(({ general }) => general?.user?.id) || User.getUser()?.user?.id;

  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(validations),
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
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) Object.keys(errors).map((key) => toast.error(errors?.[key]?.message));
  }, [errors]);

  const handleCreate = (e) => {
    dispatch(
      createBook({
        ...e,
        publisherId: currentUserId,
        genres: undefined,
        onSuccess: (res) => {
          toast.success("Book created successfully!");
          navigate(-1);
        },
      })
    );
  };

  console.log(watch());

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">New book</h2>
        </div>
        <Inputs.Button text="Submit" className={"h-9 !w-[150px] mr-3"} selected onClick={handleSubmit((e) => handleCreate(e))} />
      </div>
      <BookForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} genres={genres} />
    </div>
  );
};

export default CreateBook;
