import { useQuery } from "@tanstack/react-query"
import { getDropdownProvider } from "../api/dropdownProvider"

export enum DropdownVariant {
  Categories = "categories",
  Products = "products"
}

export const useDropdownProvider = (name: DropdownVariant) => {
  const { data: dropdownProvider, isLoading: isDropdownProviderLoading } = useQuery({
    queryKey: [`${name}-dropdown-provider`],
    queryFn: () => getDropdownProvider(name),
  })

  return {
    dropdownProvider,
    isDropdownProviderLoading
  }
}
