import Api from "../../../services/api";
import { useEffect, useState, useRef } from "react";

function Register() {
    const [users, setUsers] = useState([])

    const inputName = useRef()
    const inputPhone = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()


    // async function getUsers() {
    //     const usersFromApi = await api.get('/Register')

    //     setUsers(usersFromApi.data)
    // }

    async function createUsers() {
        await Api.post('/Register', {
            name: inputName.current.value,
            phone: inputPhone.current.value,
            email: inputEmail.current.value,
            password: inputPassword.current.value
        })

        // getUsers()
    }

    // async function deleteUsers(id) {
    //     await api.delete(`/usuarios/${id}`)
    //     getUsers()
    // }

    // useEffect(() => {
    //     getUsers()
    // }, [])

    return (
        <div className="container">
            <div className="name">
                <input  name='name' type="text" ref={inputName} placeholder="name" />
            </div>
            <div className="email">
                <input name='email' type="email" ref={inputEmail} placeholder="email" />
            </div>
            <div className="phone">
                <input name='phone' type="text" ref={inputPhone} placeholder="phone" />
            </div>
            <div className="password">
                <input name='password' type="text" ref={inputPassword} placeholder="password" />
            </div>
            <div className="button">
                <button type="button" onClick={createUsers}>
                    clique
                </button>
            </div>
        </div>
    )
}

export default Register;