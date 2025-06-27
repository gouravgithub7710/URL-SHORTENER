import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayouts = () => {
  return (
    <div>
      <main>
        {/* Header */}
        <Outlet/>
      </main>
      {/* Footer */}
    </div>
  )
}

export default AppLayouts
