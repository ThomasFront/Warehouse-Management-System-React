import { useParams } from "react-router"

export const UserProfile = () => {
  const { userId } = useParams()

  return (
    <div>UserProfile: {userId}</div>
  )
}
