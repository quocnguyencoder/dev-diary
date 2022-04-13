export default function toSpinalCase(text: string) {
  const spinal = text
    .replace(/(?!^)([A-Z])/g, ' $1')
    .replace(/[_\s]+(?=[a-zA-Z])/g, '-')
    .toLowerCase()
  return spinal
}
