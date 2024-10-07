import { format, parseISO } from "date-fns";

export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export const getUserInitials = (firstName?: string, lastName?: string) => `${firstName?.[0]?.toUpperCase() || ""}${lastName?.[0]?.toUpperCase() || ""}`

export const removeEmptyStrings = (obj: any) => {
  const cleanedObj = { ...obj }
  
  Object.keys(cleanedObj).forEach((key) => {
    if (cleanedObj[key] === '') {
      delete cleanedObj[key];
    }
  });

  return cleanedObj;
}

export const transformAvatarStorageUrl = (url: string) => url.replace("public", "storage")

export const formatDateToDisplay = (date: string) => format(parseISO(date), "dd-MM-yyyy")

export const formatDateTimeToDisplay = (date: string) => format(parseISO(date), "dd-MM-yyyy, HH:mm")

export const handleMessagePriorityColor = (priority: string) => {
  switch(priority) {
    case "high":
      return "#FF4C4C"
    case "medium": 
      return "#FFA500"
    case "low":
    default:
      return "#4CAF50"
  }
}

export const showImageAvatar = (imageUrl: string) => `${import.meta.env.VITE_BACKEND_LARAVEL}/${transformAvatarStorageUrl(imageUrl)}`