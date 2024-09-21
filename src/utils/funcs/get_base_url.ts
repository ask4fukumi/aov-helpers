import env from "#env"

const getBaseURL = function () {
  if (typeof window !== "undefined") return ""
  else if (env.NEXT_PUBLIC_VERCEL_URL && env.VERCEL_ENV === "preview")
    return `https://${process.env.VERCEL_URL}`
  else if (
    env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL &&
    env.VERCEL_ENV === "production"
  )
    return `https://${env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  else return "http://localhost:3000"
}

export default getBaseURL
