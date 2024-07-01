const getBaseURL = function () {
  if (typeof window !== "undefined") return ""
  else if (process.env.VERCEL_URL && process.env.VERCEL_ENV === "preview")
    return `https://${process.env.VERCEL_URL}`
  else if (
    process.env.VERCEL_PROJECT_PRODUCTION_URL
    && process.env.VERCEL_ENV === "production"
  )
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  else return "http://localhost:3000"
}

export default getBaseURL
