import useAsync from './useAsync'

const DEFAULT_OPTIONS = {
  headers: { 'Content-type': 'application/json' },
}

export default function useFetch(
  url: string,
  options: Record<string, any> = {},
  dependencies: any[] = [],
) {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json()
      return res.json().then((json) => Promise.reject(json))
    })
  }, dependencies)
}
