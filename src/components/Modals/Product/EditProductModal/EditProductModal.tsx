import { useEffect, useState } from "react";
import { Avatar, Box, Grid, useTheme } from "@mui/material";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ModalWrapper } from "../../ModalWrapper"
import { EditProductModalType } from "./types"
import { SubmitHandler, useForm } from "react-hook-form";
import { AddProductFormType } from "../../../Forms/AddProductForm/types";
import { addProductSchema } from "../../../../utils/schema";
import { TextFieldWithControl } from "../../../TextFieldWithControl";
import { SelectWithControl } from "../../../SelectWithControl";
import { DropdownVariant, useDropdownProvider } from "../../../../hooks/useDropdownProvider";
import { useProduct } from "../../../../hooks/useProduct";
import { Nullable } from "../../../../types/common";
import { uploadImage } from "../../../../api/user";
import { showImageAvatar } from "../../../../utils/common";
import { FileUploader } from "../../../FileUploader";

export const EditProductModal = ({ isOpen, onClose, product }: EditProductModalType) => {
  const { updateProduct, isUpdateProductLoading } = useProduct()
  const { dropdownProvider, isDropdownProviderLoading } = useDropdownProvider(DropdownVariant.Categories)
  const theme = useTheme()
  const grayColor = theme.palette.grey[400]
  const { t } = useTranslation()
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [progress, setProgress] = useState(0)
  const [productImageUrl, setProductImageUrl] = useState("")

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

  const { handleSubmit, formState: { errors }, control, clearErrors, setValue } = useForm<AddProductFormType>({
    resolver: yupResolver(addProductSchema)
  })

  const onSubmit: SubmitHandler<AddProductFormType> = async (data) => {
    if (product?.id) {
      const res = await updateProduct({
        id: product?.id,
        ...(productImageUrl && { productImageUrl: productImageUrl }),
        ...data
      })

      if (res.status === 200) {
        onClose()
      }
    }
  }

  const closeAndClearErrors = () => {
    onClose()
    clearErrors()
  }

  useEffect(() => {
    if (product) {
      setValue("name", product.name)
      setValue("categoryId", product.category.id)
      setValue("price", product.price.toString())
      setValue("stock", product.stock)
      setValue("description", product.description)
    }
  }, [product, setValue])

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={closeAndClearErrors}
      title="Edit product"
      agreeButton={{
        text: "Save",
        icon: <SaveAsIcon />,
        onClick: handleSubmit(onSubmit),
        loading: isUpdateProductLoading
      }}
      disagreeButton={{
        text: "Cancel",
        onClick: closeAndClearErrors,
      }}
    >
      {productImageUrl && (
        <Box display="flex" justifyContent="center" mb={1}>
          <Avatar
            sx={{
              height: 125,
              width: 125,
              border: `1px solid ${grayColor}`
            }}
            src={showImageAvatar(productImageUrl)}
          />
        </Box>
      )}
      <FileUploader
        label="Upload product image"
        fileName={uploadedFileName}
        progress={progress}
        onChange={onFileUpload}
      />
      <Grid container spacing={2} mt={0.5}>
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
    </ModalWrapper>
  )
}
