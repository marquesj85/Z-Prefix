import {useState, useEffect,createContext, useContext} from 'react'


const ManagerContext = createContext()

export const useManager = ()=> useContext(ManagerContext)

export const ManagerProvider = ({children}) => {
  const [loggedIn, setLoggedin] = useState(() => {
    return localStorage.getItem('loggedIn') || ''
  })

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn)
  }, [loggedIn])

  return(
    <ManagerContext.Provider value={{loggedIn, setLoggedin}}>
      {children}
    </ManagerContext.Provider>
  )
}