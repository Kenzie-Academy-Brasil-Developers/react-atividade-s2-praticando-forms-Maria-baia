import './App.css';
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import Card from './components/Card/Card';
import {Switch, Route, Link} from "react-router-dom"
import { useState } from 'react';

function App() {
  const formSchema = yup.object().shape({
    user: yup.string().max(18, "Máximo de 18 caracteres").required("Nome de usuário obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    emailConfirms: yup.string().required("Confirmação de e-mail obrigatório").email("E-mail inválido").oneOf([yup.ref('email')], "Email não corresponde"),
    name: yup.string().required("Nome obrigatório"),
    password: yup.string().required("Senha obrigatória").matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Tem que 8 caracteres, incluindo 1 letra maiúscula, 1 minúscula, 1 número e 1 caracter especial"),
    passwordConfirms: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref('password')], "Senha não correspondente"),
    city: yup.string().required("Cidade obrigatória"),
  });

  const {register, handleSubmit, formState: { errors }} = useForm(
    {
    resolver: yupResolver(formSchema)
  });

  const [data, setData] = useState([])

  const onSubmitFunction = (data) => {
    setData([data.user, data.name, data.email, data.city])
  }

  return (
    <div className="container">
      <Switch>
        <Route exact path="/">
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <div className="label-float">
            <input vplaceholder="Nome de usuário *" {...register("user")} />
            <label>Nome de usuário *</label>
            {errors.user?.message}
          </div>
          <div className="label-float">
            <input placeholder="Nome completo *" {...register("name")} />
            <label>Nome completo *</label>
            {errors.name?.message}
          </div>
          <div className="label-float">
            <input placeholder="cidade" {...register("city")} />
            <label>Cidade *</label>
            {errors.city?.message}
          </div>
          <div className="label-float">
            <input placeholder="Endereço de Email *" {...register("email")} />
            <label>Endereço de Email * </label>
            {errors.email?.message}
          </div>
          <div className="label-float">
            <input placeholder="Confirme seu Email *" {...register("emailConfirms")} />
            <label>Confirme seu Email *</label>
            {errors.emailConfirms?.message}
          </div>
          <div className="label-float">
            <input placeholder="Senha" {...register("password")} />
            <label>Senha *</label>
            {errors.password?.message}
          </div>
          <div className="label-float">
            <input placeholder="senha" {...register("passwordConfirms")}/>
            <label>Confirme sua senha *</label>
            {errors.passwordConfirms?.message}
          </div>
          <input type="checkbox" required/>
          <label>Eu aceito os termos de uso da aplicação</label>
          <div className='buttons'>
            <button type="submit">Cadastrar</button>
            <Link to="/cards">
              <button>Ver o Card do usuário</button>
            </Link>
          </div>
        </form>
        </Route>
        <Route exact path="/cards">
          <Card user={data}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
