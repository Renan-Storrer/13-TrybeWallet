import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

// componente
import Wallet from '../pages/Wallet';

import { renderWithRouterAndRedux } from './helpers/renderWith';
// mock
import mockData from './helpers/mockData';

describe('Teste da página Wallet', () => {
  afterEach(() => jest.clearAllMocks());

  it('Verifica se os inputse o botão são rendericados corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();

    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();

    const inputMethod = screen.getByTestId('method-input');
    expect(inputMethod).toBeInTheDocument();

    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();

    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdd).toBeInTheDocument();
  });

  it('Verifica se o fetch é feito', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const inputCurrency = await screen.findByRole('option', { name: 'USD' });
    expect(inputCurrency).toBeInTheDocument();
  });

  it('Verifica se é possível adicionar uma despesa e excluir', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    userEvent.type(inputValue, '21');

    const inputMethod = screen.getByTestId('method-input');
    userEvent.selectOptions(inputMethod, ['Cartão de débito']);

    const inputTag = screen.getByTestId('tag-input');
    userEvent.selectOptions(inputTag, ['Lazer']);

    const inputDescription = screen.getByTestId('description-input');
    userEvent.type(inputDescription, 'Lanche');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdd);

    const tableDescription = await screen.findByRole('cell', { name: /lanche/i });
    expect(tableDescription).toBeInTheDocument();

    const tableTag = await screen.findByRole('cell', { name: /lazer/i });
    expect(tableTag).toBeInTheDocument();

    const tableMethod = await screen.findByRole('cell', { name: /cartão de débito/i });
    expect(tableMethod).toBeInTheDocument();

    const tableValue = await screen.findByRole('cell', { name: '21.00' });
    expect(tableValue).toBeInTheDocument();

    const tableCurrency = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    expect(tableCurrency).toBeInTheDocument();

    const tableCambio = await screen.findByRole('cell', { name: /4\.75/i });
    expect(tableCambio).toBeInTheDocument();

    const tableValueConvert = await await screen.findByRole('cell', { name: /99\.82/i });
    expect(tableValueConvert).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(deleteBtn);

    expect(tableDescription).not.toBeInTheDocument();
    expect(tableTag).not.toBeInTheDocument();
    expect(tableMethod).not.toBeInTheDocument();
    expect(tableCurrency).not.toBeInTheDocument();
    expect(tableValue).not.toBeInTheDocument();
    expect(tableCambio).not.toBeInTheDocument();
    expect(tableValueConvert).not.toBeInTheDocument();
  });
});
