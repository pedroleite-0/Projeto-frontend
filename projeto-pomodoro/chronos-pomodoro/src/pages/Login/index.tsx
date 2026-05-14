import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultInput } from '../../components/DefaultInput';
import { useAuthContext } from '../../contexts/AuthContext';
import { showMessage } from '../../adapters/showMessage'; 

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!username.trim()) {
      showMessage.warn('Informe o usuário');
      return;
    }
    if (!password) {
      showMessage.warn('Informe a senha');
      return;
    }

    if (login(username, password)) {
      showMessage.success('Bem-vindo!');
      navigate('/home');
    } else {
      showMessage.error('Usuário ou senha inválidos');
    }
  }

 return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Acesso ao Chronos</h2>
        
        <DefaultInput
          id="login-user"
          labelText="Usuário"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        
        <DefaultInput
          id="login-pass"
          labelText="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
        <button className="btn-submit" type="submit">
          Entrar
        </button>
        
        <div className="login-footer">
          <button type="button" onClick={() => showMessage.info('Cadastro em breve')}>
            Cadastrar
          </button>
          <button type="button" onClick={() => showMessage.info('Recuperação em breve')}>
            Esqueci minha senha
          </button>
        </div>
      </form>
    </div>
  )
};
