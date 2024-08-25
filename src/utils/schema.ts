import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
  email: yup.string().email("This is not a valid email address").required("E-mail address is required").max(255, "The email address cannot be longer than 255 characters"),
  password: yup.string().required("Password is required").min(6, "The password cannot be less than 6 characters long")
})

export const addCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required").min(3, "The category name cannot be less than 6 characters long").max(50, "The category name cannot be longer than 50 characters")
})