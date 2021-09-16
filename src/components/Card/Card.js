import { Link } from "react-router-dom"
import './Card.css'

function Card({user}){
    console.log(user)
    return(
        <div>
            <h1>Nome de usuário: {user[0]}</h1>
            <p>Nome completo: {user[1]}</p>
            <p>Endereço de e-mail: {user[2]}</p>
            <p>Cidade: {user[3]}</p>
            <Link to="/">
                <button>Voltar ao formulário</button>
            </Link>
        </div>
    )
}
export default Card