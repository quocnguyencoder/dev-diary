export default function toSpinalCase(text: string) {
  const spinal = text
    .toLowerCase() /*LowerCase it*/
    .replace(
      /[^A-Za-z0-9]/g,
      ' ',
    ) /*Find all non alpha numeric and replace it with space*/
    .replace(/\s{1,}/g, '-') /*Convert all spaces to -*/
    .replace(/^-|[-]$/g, '') /*Slice - at the start and end*/

  return spinal
}
