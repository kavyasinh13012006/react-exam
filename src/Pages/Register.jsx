import React, { useState } from 'react'

function Register({onRegister}) {
    const [userid, setUserid] = useState('')
    const [password, setPassword] = useState('')
    const handlRegister = (e) => {
        e.preventDefault()
        if(!userid && !password){
            alert('Enter your id and password')
            return false
        }
        onRegister({ userid, password })
        alert('Register account succesfully....!')
    }
        return (
            <>
            <h2>Register Account</h2>
                <>
                    <form onSubmit={handlRegister}>
                        <input type="text" placeholder='userid' onChange={(e) => setUserid(e.target.value)} value={userid} />
                        <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                        <input type="submit" value="Register" />
                    </form>
                </>
            </>
        )
    }

    export default Register