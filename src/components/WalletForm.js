import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { fetchAPI, fetchCurrency, sendEdit } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { apiFetch } = this.props;
    apiFetch();
  }

  adicionarDespesa = () => {
    const { expenses, currencyFetch } = this.props;
    currencyFetch(this.state, expenses.length);
    this.setState({
      value: '',
      description: '',
    });
  };

  editar = () => {
    const { idToEdit, expenses, sendingEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const editaArray = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        expense.value = value;
        expense.description = description;
        expense.currency = currency;
        expense.method = method;
        expense.tag = tag;
        return expense;
      }
      return expense;
    });

    sendingEdit(editaArray);
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        Valor:
        <input
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        Descrição:
        <input
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          {currencies.map((coin, index) => (
            <option
              key={ `${coin}-${index}` }
              value={ coin }
            >
              {coin}
            </option>
          ))}
        </select>
        Método de pagamento:
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        Categoria:
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {!editor
          ? (
            <button
              type="button"
              onClick={ this.adicionarDespesa }
            >
              Adicionar despesa
            </button>)
          : (
            <button
              type="button"
              onClick={ this.editar }
            >
              Editar despesa
            </button>)}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  apiFetch: () => dispatch(fetchAPI()),
  currencyFetch: (state, id) => dispatch(fetchCurrency(state, id)),
  sendingEdit: (newExpensesArray) => dispatch(sendEdit(newExpensesArray)),
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
