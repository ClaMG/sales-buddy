import React, { useEffect } from 'react';
import '../assets/css/global.css'
import editIcon from '../assets/icons-btn/edit.png'
import './css/tables.css'
import './css/tableUser.css'
import useTableUserActions from '../hooks/tableUserActive.jsx';
import { toast } from 'react-toastify';

function TableUser() {
    const { users, getUser, error, send, formData, receberIds } = useTableUserActions();
    const handleCheckboxChange = (id) => {
        
        const idsAtuais = formData?.idsSelecionados || []; 
    
        const novosIds = idsAtuais.includes(id)
            ? idsAtuais.filter(item => item !== id) 
            : [...idsAtuais, id];

        receberIds(novosIds)
    };


    useEffect(() => {
        getUser()
        if (error) {
            toast.error(error); 
        }
    }, []);
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
                                <input type="checkbox" name="user" id={user.id} 
                                checked={formData.idsSelecionados?.includes(user.id) || false}  
                                onChange={() => handleCheckboxChange(user.id)}/>
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
        </div>
    );
}

export default TableUser;