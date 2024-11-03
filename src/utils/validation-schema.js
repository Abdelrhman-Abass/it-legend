import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("emailReq").email("emailValid").label("Email"),
  password: Yup.string().required("passwordReq").min(6, "passwordMin"),
});

export const registerSchema = Yup.object().shape({
  firstname: Yup.string().required("firstNameReq").label("First Name"),
  lastname: Yup.string().required("lastNameReq").label("Last Name"),
  email: Yup.string().required("emailReq").email("emailValid").label("Email"),
  phonenumber: Yup.string()
    .required("phoneNumberReq")
    .min(9, "phoneValid")
    .label("Phonenumber"),
  password: Yup.string().required("passwordReq").min(6, "passwordMin"),
  terms: Yup.bool().oneOf([true], "mustAgree"),
});

export const blogCommentSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email("emailValid").label("Email"),
  msg: Yup.string().required().min(20).label("Message"),
});

export const contactSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email("emailValid").label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  msg: Yup.string().required().min(20).label("Message"),
});

export const courseSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email("emailValid").label("Email"),
  msg: Yup.string().required().min(20).label("Summery"),
});
