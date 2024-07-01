const getBaseURL = function () {
  if (typeof window !== "undefined") return ""
  else if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  else return `http://localhost:${process.env.PORT}`
}

export default getBaseURL
