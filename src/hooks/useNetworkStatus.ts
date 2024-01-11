import { useState, useEffect } from "react"

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

  useEffect(() => {
    const listener = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", listener)
    window.addEventListener("offline", listener)

    return () => {
      window.removeEventListener("online", listener)
      window.removeEventListener("offline", listener)
    }
  }, [])

  return isOnline
}

export default useNetworkStatus