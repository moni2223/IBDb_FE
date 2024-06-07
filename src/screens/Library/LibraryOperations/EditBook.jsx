import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createBook, deleteBook, editBook, getCurrentBook, getGenres } from "../../../actions";
import { BookForm } from "../../../components/Forms/BookForm";
import { validations } from "./validations";
import { User } from "../../../utilities/User";
import { useQuery } from "../../../hooks/useQuery";

const EditBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookId } = useQuery();

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
    dispatch(
      getCurrentBook({
        _id: bookId,
        onSuccess: (res) => {
          setValue("title", res?.title);
          setValue("description", res?.description);
          setValue("price", res?.price);
          setValue("cover", res?.cover);
          setValue(
            "genres",
            res?.genres?.map(({ id, name }) => ({ label: name, value: { id, name } }))
          );
        },
      })
    );
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) Object.keys(errors).map((key) => toast.error(errors?.[key]?.message));
  }, [errors]);

  const handleEdit = (e) => {
    dispatch(
      editBook({
        _id: bookId,
        payload: { ...e },
        onSuccess: (res) => {
          toast.success("Book edited successfully!");
          navigate(-1);
        },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteBook({
        _id: bookId,
        onSuccess: (res) => {
          toast.success("Book deleted successfully!");
          navigate("/");
        },
      })
    );
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Edit book</h2>
        </div>
        <Inputs.Button text="Delete" className={"h-9 !w-[150px] mr-3 delete"} onClick={handleDelete} />
        <Inputs.Button text="Save" className={"h-9 !w-[150px] mr-3"} selected onClick={handleSubmit((e) => handleEdit(e))} />
      </div>
      <BookForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} />
    </div>
  );
};

export default EditBook;
