import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
  email: yup.string().email("This is not a valid email address").required("E-mail address is required").max(255, "The email address cannot be longer than 255 characters"),
  password: yup.string().required("Password is required").min(6, "The password cannot be less than 6 characters long")
})

export const addCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required").min(3, "The category name cannot be less than 3 characters long").max(50, "The category name cannot be longer than 50 characters")
})

export const editCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required").min(3, "The category name cannot be less than 3 characters long").max(50, "The category name cannot be longer than 50 characters")
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
  avatar: yup.mixed()
})

export const addMessageSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(6, "The title cannot be less than 6 characters long").max(50, "The title cannot be longer than 50 characters"),
  priority: yup.string().required("Priority is required"),
  message: yup.string().required("Message is required").min(10, "The message cannot be less than 10 characters long").max(500, "The message cannot be longer than 500 characters"),
})

export const editMessageSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(6, "The title cannot be less than 6 characters long").max(50, "The title cannot be longer than 50 characters"),
  priority: yup.string().required("Priority is required"),
  message: yup.string().required("Message is required").min(10, "The message cannot be less than 10 characters long").max(500, "The message cannot be longer than 500 characters"),
})

export const addProductSchema = yup.object().shape({
  name: yup.string().required("Product name is required").min(3, "The product name cannot be less than 3 characters long").max(100, "The product name cannot be longer than 100 characters"),
  description: yup.string().required("Description is required").min(10, "The product name cannot be less than 10 characters long").max(250, "The product name cannot be longer than 250 characters"),
  categoryId: yup.number().required("Category is required"),
  price: yup
    .string()
    .transform((value, originalValue) => originalValue === "" ? undefined : value)
    .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid number with up to 2 decimal places and cannot be negative")
    .test("max-value", "Price cannot be greater than 10,000", (value) => value === undefined || parseFloat(value) <= 10000)
    .required("Price is required"),
  stock: yup
    .number()
    .transform((value, originalValue) =>  originalValue === "" ? undefined : value)
    .typeError("Stock must be a number")
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .max(1000, "Stock cannot be greater than 1000")
})

export const addSaleSchema = yup.object().shape({
  productId: yup.number().required("Product is required"),
  quantity: yup
    .number()
    .transform((value, originalValue) =>  originalValue === "" ? undefined : value)
    .typeError("Stock must be a number")
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(2, "Stock cannot be less than 1")
})