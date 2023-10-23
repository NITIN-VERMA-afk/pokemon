import { NavLink,Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-indigo-700 h-12 flex justify-around items-center rounded-lg  ">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDSZwBV6DcMuQ-awc1WSuoo2S4SGtbcDgsjA&usqp=CAU"
          alt=""
        />
        <div className="flex justify-center items-center gap-10">
        <h1 className="text-3xl italic text-white">pokepedia</h1>
        <NavLink to="/library"> <p>Library </p></NavLink>
        <NavLink to="/"> <p>Home </p></NavLink>

        </div>
      
      </div>
      <Outlet />
    </>
  );
};

export default Header;
