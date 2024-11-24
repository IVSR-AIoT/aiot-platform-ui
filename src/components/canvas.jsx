import React, { useState } from 'react'

// eslint-disable-next-line react/prop-types
const DotAreaApp = ({ initialDots = [], initialHull = [] }) => {
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
  }

  const calculateConvexHull = (points) => {
    if (points.length < 3) {
      setHull([])
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

    setHull([...lowerHull, ...upperHull])
  }

  return (
    <div>
      <h1>Vẽ điểm và tính đường bao (Convex Hull)</h1>
      <div
        onClick={handleCanvasClick}
        style={{
          width: '500px',
          height: '500px',
          border: '1px solid black',
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

      <div style={{ marginTop: '20px' }}>
        <h2>Tọa độ các điểm:</h2>
        {dots.length > 0 ? (
          <ul>
            {dots.map((dot, index) => (
              <li key={index}>
                Điểm {index + 1}: (X: {dot.x}, Y: {dot.y})
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có điểm nào được vẽ.</p>
        )}

        {hull.length > 0 && (
          <>
            <h2>Tọa độ các điểm đường bao:</h2>
            <ul>
              {hull.map((dot, index) => (
                <li key={index}>
                  Điểm {index + 1}: (X: {dot.x}, Y: {dot.y})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button onClick={clearDots} style={{ marginTop: '10px' }}>
        Xóa điểm
      </button>
    </div>
  )
}

export default DotAreaApp
