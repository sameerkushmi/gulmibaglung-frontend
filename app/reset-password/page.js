import ResetPassword from "@/components/ResetPassword/ResetPassword"
import { Suspense } from "react"

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Preparing reset form...</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  )
}

export default ResetPasswordPage