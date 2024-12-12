import { useState } from "react"
import Forget from "./Pages/Forget"
import Loging from "./Pages/Loging"
import Register from "./Pages/Register"
import Dashbord from "./Pages/Dashbord"

function App() {
  const [currentPage, setcurrentPage] = useState('register')
  const [userRegister, setuserRegister] = useState(null)

  const handleRegister = (newRegister) => {
    setuserRegister(newRegister)
    setcurrentPage('loging')
    console.log(newRegister);
  }

  const handleLoging = (checkLoging) => {
    if (userRegister.userid === checkLoging.userid && userRegister.password === checkLoging.password) {
      setcurrentPage('dasbord')
      alert('You are login account succesfully....!')
    } else {
      alert('Invald userid and password')
    }
  }

  const logOutacc = () => {
    setcurrentPage('register')
    alert('logout your account.....!')
  }

  return (
    <>
      {currentPage === 'register' && <Register onRegister={handleRegister} />}
      {currentPage === 'loging' && <Loging onLoging={handleLoging} onForget={() => setcurrentPage('forget')} />}
      {currentPage === 'forget' && <Forget ontoLoging={() => setcurrentPage('loging')} />}
      {currentPage === 'dasbord' && <Dashbord onLogout={logOutacc} />}
    </>
  )
}

export default App
