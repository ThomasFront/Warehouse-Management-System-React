import { useState } from "react";
import { Avatar, Box, Grid, useTheme } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FormWrapper } from "../FormWrapper"
import { addProductSchema } from "../../../utils/schema";
import { AddProductFormType } from "./types";
import { TextFieldWithControl } from "../../TextFieldWithControl";
import { SelectWithControl } from "../../SelectWithControl";
import { FileUploader } from "../../FileUploader";
import { Nullable } from "../../../types/common";
import { showImageAvatar } from "../../../utils/common";
import { uploadImage } from "../../../api/user";
import { DropdownVariant, useDropdownProvider } from "../../../hooks/useDropdownProvider";
import { useProduct } from "../../../hooks/useProduct";
import productDefaultImage from "../../../assets/images/productDefault.png"

export const AddProductForm = () => {
  const { t } = useTranslation()
  const { dropdownProvider, isDropdownProviderLoading } = useDropdownProvider(DropdownVariant.Categories)
  const { createProduct, isCreateProductsLoading } = useProduct()
  const theme = useTheme()
  const grayColor = theme.palette.grey[400]
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [progress, setProgress] = useState(0)
  const [productImageUrl, setProductImageUrl] = useState("")

  const { handleSubmit, formState: { errors }, control } = useForm<AddProductFormType>({
    resolver: yupResolver(addProductSchema)
  })

  const onFileUpload = async (file: Nullable<File>) => {
    if (file) {
      const fileName = file.name
      try {
        const { data } = await uploadImage(file, setProgress, "products/image")

        setProductImageUrl(data.data.image)
        setUploadedFileName(fileName)
      } catch {
        toast.error(t("Failed to upload product image"))
      }
    }
  }

  const onSubmit: SubmitHandler<AddProductFormType> = (data) => {
    const payload = {
      ...data,
      productImageUrl,
    }

    createProduct(payload)
  }

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      submitButton={{
        name: "Add product",
        icon: <AddIcon />,
        loading: isCreateProductsLoading
      }}
    >
      <Box display="flex" justifyContent="center" mb={1}>
        <Avatar
          sx={{
            height: 125,
            width: 125,
            border: `1px solid ${grayColor}`
          }}
          src={productImageUrl ? showImageAvatar(productImageUrl) : productDefaultImage}
        />
      </Box>
      <FileUploader
        label="Upload product image"
        fileName={uploadedFileName}
        progress={progress}
        onChange={onFileUpload}
      />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6}>
          <TextFieldWithControl
            name="name"
            label="Product name"
            requiredSign
            control={control}
            errors={errors}
            data-testid="productName"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectWithControl
            name="categoryId"
            label="Category"
            requiredSign
            control={control}
            errors={errors}
            options={dropdownProvider || []}
            data-testid="category"
            loading={isDropdownProviderLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldWithControl
            name="price"
            label="Price per unit"
            requiredSign
            control={control}
            errors={errors}
            type="number"
            data-testid="price"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldWithControl
            name="stock"
            label="Quantity"
            requiredSign
            control={control}
            errors={errors}
            type="number"
            data-testid="stock"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithControl
            name="description"
            label="Description"
            requiredSign
            control={control}
            errors={errors}
            multiline
            minRows={10}
            data-testid="description"
          />
        </Grid>
      </Grid>
    </FormWrapper>
  )
}
