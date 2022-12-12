import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRouterAndRedux } from './helpers/renderWith';

// componente
import Header from '../components/Header';

describe('Teste do componente Login Header', () => {
  it('Verifica se os elementos são exibidos na tela', () => {
    const INITIAL_STATE = {
      user: { email: 'renan@test.com' },
      wallet: { totalValue: 7.75 },
    };

    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });

    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('renan@test.com');

    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('7.75');

    const moeda = screen.getByTestId('header-currency-field');
    expect(moeda).toBeInTheDocument();
    expect(moeda).toHaveTextContent('BRL');
  });
});
