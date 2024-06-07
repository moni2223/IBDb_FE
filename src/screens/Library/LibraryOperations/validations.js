import * as Yup from "yup";

const bookValidations = Yup.object().shape({
  title: Yup.string().required("Please enter title.").min(4, "Title must be at least 4 characters long.").label("Title"),
  price: Yup.number().required("Please enter price.").label("Price"),
  description: Yup.string().required("Please enter short description.").min(4, "Description must be at least 4 characters long.").label("description"),
  genresIds: Yup.array().of(Yup.number().integer("Each genre ID must be an integer.").required("Genre ID is required.")).min(1, "Please select at least one genre."),
});
export const validations = bookValidations;
