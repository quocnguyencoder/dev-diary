export const arrToURI = (arr: string[]) =>
  encodeURIComponent(JSON.stringify(arr))
