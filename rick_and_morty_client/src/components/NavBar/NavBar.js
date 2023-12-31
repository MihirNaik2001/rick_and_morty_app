function NavBar() {
  const navItems = [
    "Home",
    "Location",
    "Episodes"
  ]

  return (
    <div className="flex justify-end bg-blue-500">
      <div className="absolute top-5 left-5 text-xl"><h1><b className='text-white'>Rick & Morty App</b></h1></div>

      {navItems.map((item, k) => {
        return (
          <div key={k} className="m-5 text-white">{item}</div>
        )
      })}
    </div>
  );
}

export default NavBar;
