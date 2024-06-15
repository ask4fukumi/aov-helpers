import { useEffect } from "react"

const Inputs: React.FC = () => {
  useEffect(() => {
    console.log("hello")
  }, [])

  return <div>hello</div>
}

export default Inputs
