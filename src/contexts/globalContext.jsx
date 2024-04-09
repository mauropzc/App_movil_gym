import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from "../hooks/useAsyncStorage";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [usuarios, setUsuarios] = useAsyncStorage("usuarios", [])

  const [usuarioPerfil, setUsuarioPerfil] = useState(null);

  const crearUsuario = (datosFisico) => {
    const nuevoUsuario = {
      ...usuarioPerfil,
      ...datosFisico
    }

    setUsuarios([...usuarios, nuevoUsuario]);
    
  }

  console.log("usuarios", usuarios);

  //Gestión de Usuarios JSON 

  return (
    <GlobalContext.Provider 
      value={{ usuarios, 
        usuarioPerfil,
        setUsuarioPerfil, 
        crearUsuario}}
    >
      {children}
    </GlobalContext.Provider>
  );
}

