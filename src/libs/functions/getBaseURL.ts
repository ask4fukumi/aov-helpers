const getBaseURL = function () {
  if (typeof window !== "undefined") return ""
  else if (
    process.env.NEXT_PUBLIC_VERCEL_URL
    && process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
  )
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  else if (
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    && process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
  )
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  else return `http://localhost:${process.env.PORT}`
}

export default getBaseURL
