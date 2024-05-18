import { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/global.jsx'

const useDetails = () => {
  const { setIsShowDetails } = useGlobalContext()
  const [showDetails, setShowDetails] = useState(null)

  useEffect(() => {
    setIsShowDetails(!!showDetails)
  }, [showDetails, setIsShowDetails])

  return [showDetails, setShowDetails]
}

export default useDetails
