import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { eraseExpense, idEdit } from '../redux/actions';

class Table extends Component {
  handleEdit = (id) => {
    const { editingId } = this.props;
    editingId(id);
  };

  delete = (id) => {
    const { expenses, deleteExpense } = this.props;
    const newArrayExpense = expenses.filter((expense) => expense.id !== id);
    deleteExpense(newArrayExpense);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {expenses.map((expense) => {
            const conversao = Number(expense.exchangeRates[expense.currency].ask)
            * Number(expense.value);
            const valorFixo = Number(expense.value).toFixed(2);
            const intercambioFixo = Number(expense.exchangeRates[expense.currency].ask)
              .toFixed(2);
            const conversaoFixa = Number(conversao.toFixed(2));
            return (
              <tr key={ uuid() }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{valorFixo}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{intercambioFixo}</td>
                <td>{conversaoFixa}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.delete(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (newExpensesArray) => dispatch(eraseExpense(newExpensesArray)),
  editingId: (id) => dispatch(idEdit(id)),
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
