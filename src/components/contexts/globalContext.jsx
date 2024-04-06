import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);

  const [usuarioPerfil, setUsuarioPerfil] = useState(null);

  const crearUsuario = (datosFisico) => {
    const nuevoUsuario = {
      ...usuarioPerfil,
      ...datosFisico
    }

    setUsuarios([...usuarios, nuevoUsuario]);
  }

  console.log(usuarios);

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
