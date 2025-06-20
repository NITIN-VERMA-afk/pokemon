import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          
            <div className="flex items-center space-x-3">
              <img
                className="h-10 w-10 rounded-full ring-2 ring-white/20 shadow-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDSZwBV6DcMuQ-awc1WSuoo2S4SGtbcDgsjA&usqp=CAU"
                alt="Pokepedia Logo"
              />
              <h1 className="text-2xl font-bold text-white tracking-wide">
                Pokepedia
              </h1>
            </div>

          
            <nav className="flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-md"
                      : "text-indigo-100 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-md"
                      : "text-indigo-100 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                Library
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default Header;
