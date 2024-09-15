import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
  email: yup.string().email("This is not a valid email address").required("E-mail address is required").max(255, "The email address cannot be longer than 255 characters"),
  password: yup.string().required("Password is required").min(6, "The password cannot be less than 6 characters long")
})

export const addCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required").min(3, "The category name cannot be less than 6 characters long").max(50, "The category name cannot be longer than 50 characters")
})

export const editCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required").min(3, "The category name cannot be less than 6 characters long").max(50, "The category name cannot be longer than 50 characters")
})

export const createUserSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(3, "The first name cannot be less than 3 characters long").max(50, "The first name cannot be longer than 50 characters"),
  lastName: yup.string().required("Last name is required").min(3, "The last name cannot be less than 3 characters long").max(50, "The last name cannot be longer than 50 characters"),
  email: yup.string().email("This is not a valid email address").required("E-mail address is required").max(255, "The email address cannot be longer than 255 characters"),
  role: yup.string().required("Role is required"),
  password: yup.string().required("Password is required").min(6, "The password cannot be less than 6 characters long")
})

export const updateUserSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(3, "The first name cannot be less than 3 characters long").max(50, "The first name cannot be longer than 50 characters"),
  lastName: yup.string().required("Last name is required").min(3, "The last name cannot be less than 3 characters long").max(50, "The last name cannot be longer than 50 characters"),
  email: yup.string().email("This is not a valid email address").required("E-mail address is required").max(255, "The email address cannot be longer than 255 characters"),
  role: yup.string().required("Role is required"),
  colorTheme: yup.string(),
  password: yup.string()
  .notRequired()
  .test(
    'is-empty-or-valid',
    'The password cannot be less than 6 characters long',
    value => !value || value.length >= 6
  )
})

export const updateUserProfileSchema = yup.object().shape({
  colorTheme: yup.string(),
})