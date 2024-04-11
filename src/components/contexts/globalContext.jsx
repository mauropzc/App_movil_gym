import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const [usuarios, setUsuarios] = useState([{"altura": "160", "apellido": "Muñoz", "correo": "nidiamunoz0708@gmail.com", "edad": "20", "meta": "Lose Fat", "nivel": "Beginner", "nombre": "Nidia", "password": "nidia123", "peso": "69", "peso_meta": "60", "username": "Nidia07"}]);

  const [usuarioPerfil, setUsuarioPerfil] = useState(null);

  const [usuarioActual, setUsuarioActual] = useState(null);

  const [count, setCount] = useState(0);

  const [lastIncrementDate, setLastIncrementDate] = useState(null);

  const valorCalories = totalCalories(usuarioActual);

  function totalCalories(usuario) {
    if (usuario != null) {
      meta = usuario.meta
      switch (meta) {
        case 'Lose Fat':
          return [1002,72,66,50];
        case 'Gain Fat':
          return [3002,186,182,170];
        case 'Keep Fat':
          return [2005,115,123,117];
        default:
          return 0; // Valor predeterminado si la meta no coincide con ninguna de las opciones anteriores
      }
  }
  }; 

  const crearUsuario = (datosFisico) => {
    const nuevoUsuario = {
      ...usuarioPerfil,
      ...datosFisico
    }

    setUsuarios([...usuarios, nuevoUsuario]);
  }

  console.log(usuarios);
  console.log(count);

  return (
    <GlobalContext.Provider 
      value={{ usuarios, 
        usuarioPerfil,
        setUsuarioPerfil, 
        crearUsuario, 
        usuarioActual, 
        setUsuarioActual,
        count,
        setCount,
        lastIncrementDate, 
        setLastIncrementDate,
        valorCalories}}

    >
      {children}
    </GlobalContext.Provider>
  );
}
