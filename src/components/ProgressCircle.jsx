import React from 'react'
import { View } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'

function ProgressCircle ({ progress, size, strokeWidth }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progressStrokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation='-90' origin={`${size / 2},${size / 2}`}>
          {/* Fondo transparente */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill='transparent'
            strokeWidth={strokeWidth}
            stroke='#E0E0E0'
          />
          {/* Círculo de progreso */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill='none'
            stroke='#3498db' // Color del progreso
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={progressStrokeDashoffset}
          />
        </G>
      </Svg>
    </View>
  )
}

export default ProgressCircle
