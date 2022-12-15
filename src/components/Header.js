import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let field = 0;
    expenses.forEach((expense) => {
      const conversão = Number(expense.exchangeRates[expense
        .currency].ask) * Number(expense.value);
      const conversãoFixa = conversão.toFixed(2);
      field += Number(conversãoFixa);
    });
    if (field === 0) {
      field = '0.00';
    }
    return (
      <div className="header">
        <p data-testid="email-field">{email}</p>
        <div>
          <p>
            TOTAL DE DESPESAS:
          </p>
          <p data-testid="total-field">
            {field}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
