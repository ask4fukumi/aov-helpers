const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(min, value), max)

export default clamp
