import { NavLink,Outlet } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="bg-indigo-700 h-24 flex justify-around items-center rounded-lg  ">
        <img
          className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhY5IKq8J1TYt7k4-W5eWtMAFuG-hsbPyoA&usqp=CAU"
          alt=""
        />
        <h1 className="text-3xl italic text-white">pokepedia</h1>
        <NavLink to="/library"> <p>Library </p></NavLink>
        <NavLink to="/"> <p>Home </p></NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
