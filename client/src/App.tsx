import './App.css'

// router
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className="screen-size overflow-h-scroll bg-slate-100 absolute top-0 left-0">
      {/* other stuff goes here */}
      <div className="n-container mx-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default App
