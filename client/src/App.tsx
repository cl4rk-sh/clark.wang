// router
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className="screen-size">
      <div className="bg-slate-100 m-0 p-0 min-h-full">
        {/* other stuff goes here */}
        <div className="n-container mx-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
