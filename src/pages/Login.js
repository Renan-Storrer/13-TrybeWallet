import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <form onSubmit={ this.submitEmail }>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          name="senha"
          type="password"
          data-testid="password-input"
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
