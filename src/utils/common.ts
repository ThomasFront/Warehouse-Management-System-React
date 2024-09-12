export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export const getUserInitials = (firstName?: string, lastName?: string) => `${firstName?.[0]?.toUpperCase() || ""}${lastName?.[0]?.toUpperCase() || ""}`

export const  removeEmptyStrings = (obj: any) => {
  const cleanedObj = { ...obj }
  
  Object.keys(cleanedObj).forEach((key) => {
    if (cleanedObj[key] === '') {
      delete cleanedObj[key];
    }
  });

  return cleanedObj;
}