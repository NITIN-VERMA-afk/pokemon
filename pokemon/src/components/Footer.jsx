

const Footer = () => {
  return (
    <div  style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "#3B82F6", // You can change the background color as needed
      height: "2.5rem", // Adjust the height as needed
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }} className="bg-indigo-700 h-24 rounded-lg text-white text-center ">
        <p>&copy; 2023 pokepedia. All rights reserved.</p>

      
    </div>
  )
}

export default Footer
