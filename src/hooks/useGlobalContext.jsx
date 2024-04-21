import { useContext } from 'react'
import { GlobalContext } from '../contexts/globalContext'

function useGlobalContext () {
  return useContext(GlobalContext)
}

export default useGlobalContext
