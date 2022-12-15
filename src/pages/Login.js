import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/login.css';

// actions
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    btnDisable: true,
  };

  verificaInputs = () => {
    const { email, senha } = this.state;
    const length = 6;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (emailRegex.test(email) && senha.length >= length) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verificaInputs();
    });
  };

  submitEmail = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { handleLogin, history } = this.props;
    handleLogin(email);
    history.push('/carteira');
  };

  render() {
    const { email, senha, btnDisable } = this.state;
    return (
      <div className="divform">
        <form className="login" onSubmit={ this.submitEmail }>
          <h1>LOGIN</h1>
          <input
            name="email"
            type="email"
            data-testid="email-input"
            placeholder="  digite seu e-mail"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            name="senha"
            type="password"
            data-testid="password-input"
            placeholder="  digite sua senha"
            value={ senha }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ btnDisable }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  handleLogin: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
