export default function toSpinalCase(text: string) {
  const spinal = text
    .replace(/([A-Z])/g, ' $1') /*Find all cap and add space at the start*/
    .replace(
      /[^A-Za-z0-9]/g,
      ' ',
    ) /*Find all non alpha numeric and replace it with space*/
    .replace(/\s{1,}/g, '-') /*Convert all spaces to -*/
    .replace(/^-|[-]$/g, '') /*Slice - at the start and end*/
    .toLowerCase() /*LowerCase it*/
  return spinal
}
