import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { t } from "i18next";
import { Avatar, Box, CircularProgress, Grid, Typography, useTheme } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import AddIcon from '@mui/icons-material/Add';
import { FormWrapper } from "../FormWrapper"
import { addSaleSchema } from "../../../utils/schema"
import { AddSaleFormType } from "./types"
import { SelectWithControl } from "../../SelectWithControl";
import { DropdownVariant, useDropdownProvider } from "../../../hooks/useDropdownProvider";
import { useProduct } from "../../../hooks/useProduct";
import { showImageAvatar } from "../../../utils/common";
import productDefaultImage from "../../../assets/images/productDefault.png"
import { TextFieldWithControl } from "../../TextFieldWithControl";
import { ErrorMessage } from "../../ErrorMessage";
import { useSale } from "../../../hooks/useSale";

export const AddSaleForm = () => {
  const { addNewSale, isAddNewSaleLoading } = useSale()
  const { dropdownProvider, isDropdownProviderLoading } = useDropdownProvider(DropdownVariant.Products)
  const theme = useTheme()
  const grayColor = theme.palette.grey[400]

  const { handleSubmit, formState: { errors }, control, watch } = useForm<AddSaleFormType>({
    resolver: yupResolver(addSaleSchema),
  })

  const selectedQuantity = watch("quantity")
  const selectedProductId = watch("productId")
  const { product, isProductLoading } = useProduct(selectedProductId)

  const totalPrice = useMemo(() => {
    if (product) {
      return `${(Number(product.price) * selectedQuantity).toFixed(2)} PLN`
    }
  }, [product, selectedQuantity])

  const isSaleDisabled = product && (selectedQuantity > product?.stock)

  const onSubmit: SubmitHandler<AddSaleFormType> = (data) => addNewSale(data)

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      submitButton={{
        name: "Add sale",
        icon: <AddIcon />,
        loading: isAddNewSaleLoading,
        disabled: isSaleDisabled
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SelectWithControl
            name="productId"
            label="Product"
            requiredSign
            control={control}
            errors={errors}
            options={dropdownProvider || []}
            loading={isDropdownProviderLoading}
            data-testid="productId"
          />
        </Grid>
        {isProductLoading && <Box display="flex" justifyContent="center" width="100%" my={2}><CircularProgress /></Box>}
        {product && (
          <Grid item xs={12}>
            <Box display="flex" gap={1}>
              <Avatar
                sx={{
                  height: 50,
                  width: 50,
                  border: `1px solid ${grayColor}`
                }}
                src={product?.image ? showImageAvatar(product.image) : productDefaultImage}
              />
              <Box>
                <Typography>{t("Price")}: {product?.price} PLN</Typography>
                <Typography>{t("Stock")}: {product?.stock}</Typography>
              </Box>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextFieldWithControl
            name="quantity"
            label="Quantity"
            requiredSign
            control={control}
            errors={errors}
            type="number"
            data-testid="quantity"
          />
        </Grid>
      </Grid>
      {!isSaleDisabled && selectedQuantity && selectedProductId && <Typography mt={1}>{t("Total price")}:  {totalPrice}</Typography>}
      {isSaleDisabled && <ErrorMessage message="You do not have this quantity of this product in stock" />}
    </FormWrapper>
  )
}
