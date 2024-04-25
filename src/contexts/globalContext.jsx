/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'
import { Alert } from 'react-native'
import useAsyncStorage from '../hooks/useAsyncStorage'
import axios from 'axios'
import { API_URL } from '@env'
import estadosInfoNutricional from '../mocks/estadosInfoNutricional.json'

export const GlobalContext = createContext()

export function GlobalProvider ({ children }) {
  const [usuarios, setUsuarios] = useAsyncStorage('usuarios', [])
  const [usuarioPerfil, setUsuarioPerfil] = useState(null)
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [usuarioCheck, setUsuarioCheck] = useState(null)
  const [progress, setProgress] = useState({ proteins: 0, carbs: 0, fats: 0, calories: 0, progress: 0 })

  const [comidas, setComidas] = useState({
    breakfast: { ingredients: null, nutricion: [] },
    lunch: { ingredients: null, nutricion: [] },
    dinner: { ingredients: null, nutricion: [] }
  })

  const [count, setCount] = useState(0)

  const [lastIncrementDate, setLastIncrementDate] = useState(null)

  const infoNutricionalUser = usuarioActual
    ? estadosInfoNutricional.find((estado) => estado.name === usuarioActual.physicalGoal)
    : null

  const crearUsuario = async (datosFisico) => {
    const nuevoUsuario = {
      ...usuarioPerfil,
      ...datosFisico,
      ...usuarioCheck
    }

    try {
      await axios.post(`${API_URL}/users`,
        nuevoUsuario
      )
      Alert.alert('Success', 'User created successfully')
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Error creating user')
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        usuarios,
        usuarioPerfil,
        setUsuarioPerfil,
        crearUsuario,
        usuarioActual,
        setUsuarioActual,
        count,
        setCount,
        lastIncrementDate,
        setLastIncrementDate,
        infoNutricionalUser,
        comidas,
        setComidas,
        progress,
        setProgress,
        usuarioCheck,
        setUsuarioCheck,
        setUsuarios
      }}

    >
      {children}
    </GlobalContext.Provider>
  )
}
