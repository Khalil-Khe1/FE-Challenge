import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex flex-col gap-2">
      <Navbar/>
      <div className="mt-20 lg:mt-0">
        <Outlet />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
