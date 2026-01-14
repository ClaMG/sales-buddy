import React, { useEffect } from 'react';
import '../assets/css/global.css'
import editIcon from '../assets/icons-btn/edit.png'
import './css/tables.css'
import './css/tableUser.css'
import useTableUserActions from '../hooks/tableUserActive.jsx';


function TableUser() {
    const { users, getUser, error, send } = useTableUserActions();

    useEffect(() => {
        getUser()
    }, [getUser]);
    return (
        <div>
        <table className='table-user table-base'>
            <thead className='thead'>
                <tr>
                    <th className='user-close'></th>
                    <th>USUÁRIO</th>
                    <th>NOME</th>
                    <th>EMPRESA</th>
                    <th>CNPJ</th>
                    <th className='user-left'></th>
                </tr>
            </thead>
            <tbody className='tbody'>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className='user-close'>
                                <label htmlFor={user.id}>
                                <input type="checkbox" name="user" id={user.id} />
                                </label>
                            </td>
                            <td className='user-field'>{user.usuario}</td>
                            <td>{user.nome}</td>
                            <td>{user.empresa}</td>
                            <td>{user.cnpj}</td>
                            <td>
                                <button className='btn-table' onClick={() => send(user.id)}>
                                    <img src={editIcon} alt="icone para editar usuario" />
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
        {error && <p className='p-erro-table'>{error}</p>}
        </div>
    );
}

export default TableUser;