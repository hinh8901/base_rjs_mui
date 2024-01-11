import { useEffect, useState } from "react"

/**
 * 
 * @param query A string representing the media query (example: "(min-width: 180px)")
 * @returns Boolean - true if the current query matches current viewport
 */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    mediaQuery.addEventListener("change", listener)
    setMatches(mediaQuery.matches)

    return () => {
      mediaQuery.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}

export default useMediaQuery
