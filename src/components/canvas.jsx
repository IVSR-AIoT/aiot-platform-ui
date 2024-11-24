/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button } from 'antd'

const DotAreaApp = ({ initialDots = [], initialHull = [], onAreaChange, size = 500 }) => {
  const [dots, setDots] = useState(initialDots)
  const [hull, setHull] = useState(initialHull)

  const handleCanvasClick = (event) => {
    const rect = event.target.getBoundingClientRect()
    const x = Math.round(event.clientX - rect.left)
    const y = Math.round(event.clientY - rect.top)

    setDots((prevDots) => {
      const newDots = [...prevDots, { x, y }]
      calculateConvexHull(newDots)

      return newDots
    })
  }

  const clearDots = () => {
    setDots([])
    setHull([])
    if (onAreaChange) onAreaChange([])
  }

  const calculateConvexHull = (points) => {
    if (points.length < 3) {
      setHull([])
      if (onAreaChange) onAreaChange([])

      return
    }

    const sortedPoints = [...points].sort((a, b) => a.x - b.x || a.y - b.y)

    const crossProduct = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)

    const lowerHull = []
    for (const dot of sortedPoints) {
      while (
        lowerHull.length >= 2 &&
        crossProduct(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], dot) <= 0
      ) {
        lowerHull.pop()
      }
      lowerHull.push(dot)
    }

    const upperHull = []
    for (let i = sortedPoints.length - 1; i >= 0; i--) {
      const dot = sortedPoints[i]
      while (
        upperHull.length >= 2 &&
        crossProduct(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], dot) <= 0
      ) {
        upperHull.pop()
      }
      upperHull.push(dot)
    }

    upperHull.pop()
    lowerHull.pop()

    const newHull = [...lowerHull, ...upperHull]
    setHull(newHull)
    if (onAreaChange) onAreaChange(newHull)
  }

  return (
    <div className="p-[20px]">
      <div
        onClick={handleCanvasClick}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: '2px solid black',
          position: 'relative',
          background: '#f0f0f0'
        }}
      >
        {dots.map((dot, index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'red',
              position: 'absolute',
              left: dot.x - 5,
              top: dot.y - 5
            }}
          />
        ))}

        {dots.length > 1 && hull.length === 0 && (
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <polyline
              points={dots.map((dot) => `${dot.x},${dot.y}`).join(' ')}
              fill="none"
              stroke="blue"
              strokeWidth="2"
            />
          </svg>
        )}

        {hull.length > 0 && (
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <polygon
              points={hull.map((dot) => `${dot.x},${dot.y}`).join(' ')}
              fill="rgba(0, 128, 255, 0.3)"
              stroke="blue"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>

      <Button onClick={clearDots} className="mt-[10px]">
        Delete Area
      </Button>
    </div>
  )
}

export default DotAreaApp
