import { useEffect } from "react";
import { Grid } from "@mui/material";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalWrapper } from "../../ModalWrapper"
import { EditProductModalType } from "./types"
import { SubmitHandler, useForm } from "react-hook-form";
import { AddProductFormType } from "../../../Forms/AddProductForm/types";
import { addProductSchema } from "../../../../utils/schema";
import { TextFieldWithControl } from "../../../TextFieldWithControl";
import { SelectWithControl } from "../../../SelectWithControl";
import { DropdownVariant, useDropdownProvider } from "../../../../hooks/useDropdownProvider";
import { useProduct } from "../../../../hooks/useProduct";

export const EditProductModal = ({ isOpen, onClose, product }: EditProductModalType) => {
  const { updateProduct, isUpdateProductLoading } = useProduct()
  const { dropdownProvider, isDropdownProviderLoading } = useDropdownProvider(DropdownVariant.Categories)

  const { handleSubmit, formState: { errors }, control, clearErrors, setValue } = useForm<AddProductFormType>({
    resolver: yupResolver(addProductSchema)
  })

  const onSubmit: SubmitHandler<AddProductFormType> = async (data) => {
    if (product?.id) {
      const res = await updateProduct({
        id: product?.id,
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
      <Grid container spacing={2}>
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
