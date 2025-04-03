import {useState, createContext, useContext} from 'react'

const ManagerContext = createContext()

export const useManager = ()=> useContext(ManagerContext)

export const ManagerProvider = ({children}) => {
  const [loggedIn, setLoggedin] = useState('')

  return(
    <ManagerContext.Provider value={{loggedIn, setLoggedin}}>
      {children}
    </ManagerContext.Provider>
  )
}