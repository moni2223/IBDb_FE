import * as Yup from "yup";

export const loginValidations = Yup.object().shape({
  email: Yup.string().email("Please enter valid email.").required("Please enter your email.").min(4).label("Email"),
  password: Yup.string().required("Please enter your password.").min(4).label("Password"),

});
export const registrationValidations = Yup.object().shape({
  fullName: Yup.string().required("Please enter your full name.").min(4).label("Full Name"),
  userName: Yup.string().required("Please enter your username.").min(4).label("User Name"),
  password: Yup.string().required("Please enter your password.").min(4).label("Password"),
  email: Yup.string().email("Please enter valid email.").required("Please enter your email.").min(4).label("Email"),
  roleName: Yup.string().required("Please choose your role."),
});

export const validations = { login: loginValidations, register: registrationValidations };
