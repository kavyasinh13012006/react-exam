import React, { useState } from 'react'

function Loging({ onLoging, onForget }) {
    const [userid, setUserid] = useState('')
    const [password, setPassword] = useState('')
    const handlLoging = (e) => {
        e.preventDefault()
        onLoging({ userid, password })
        // console.log(userid);
        // console.log(password);     
    }
    return (
        <>
            <h2>Loging Pages</h2>
            <form onSubmit={handlLoging}>
                <input type="text" placeholder='userid' onChange={(e) => setUserid(e.target.value)} value={userid} />
                <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                <input type="submit" value="submit" />
            </form>
            <button onClick={onForget}>Forgetpassword</button>
        </>
    )
}

export default Loging