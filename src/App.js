import React, { useState, useMemo } from 'react';
import './App.css';
import {api} from './api';

function App() {
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  const [errorMatch, setErrorMatch] = useState(false);
  const [errorLength, setErrorLength] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const url = new URL(window.location.href);

    const reset_token = url.searchParams.get('reset_token') || '';
    const email = url.searchParams.get('user') || '';

    setErrorLength(false);
    setErrorMatch(false);

    if (password.length <= 6 || passwordMatch.length <= 6) {
      setErrorLength(true);
      return;
    }

    if (passwordMatch !== password) {
      setErrorMatch(true);
      return;
    }

    try {
      const response = await api.put('reset_password', {
        email,
        password,
        reset_token
      });

      console.log(response);
    } catch(err) {
    }
  }

  return (
    <div className="container">
      <h1>Busca<strong>pra</strong>mim</h1>
      <div className="panel">
        <form onSubmit={handleSubmit}>
          <input 
            type="password"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <input 
            type="password"
            value={passwordMatch}
            onChange={e => setPasswordMatch(e.target.value)}
            placeholder="Confirme sua nova senha"/>
            {errorMatch ? <span class="error">As senhas não coincidem</span> : null}
            {errorLength ? <span class="error">As senhas deve ter mais que 6 caracteres</span> : null}
          <button type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
