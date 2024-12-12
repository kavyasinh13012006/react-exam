import React, { useState } from 'react'

function Forget({ontoLoging}) {
    const [userid, setUserid] = useState('')
    const handleReset = (e) => {
        e.preventDefault();
        alert(`Password reset link sent to ${userid}`);
    }
    return (
        <>
        <h2>Forget password....! </h2>
            <form onSubmit={handleReset}>
                <input type="text" placeholder='Enter your e-mail' onChange={(e) => setUserid(e.target.value)} value={userid} />
                <input type="submit" value="Reset-password" />
            </form>
            <button onClick={ontoLoging}>Back to loging</button>
        </>
    )
}

export default Forget