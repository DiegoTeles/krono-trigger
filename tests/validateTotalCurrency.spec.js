const { validateTotalCurrency } = require('../src/utils/validateTotalCurrency');

test('Validate inconsistency in installment values', () => {
  const data = {
    vlTotal: '1000',
    qtPrestacoes: '5',
    vlPresta: '250', // Este valor deveria ser 200 para ser consistente com o cálculo (1000 / 5)
  };

  const result = validateTotalCurrency(data);
  const expectedError = [{ values: 'Valores de prestações inconsistentes' }];

  expect(result).toEqual(expectedError);
});

test('Validate consistency of installment values', () => {
  const data = {
    vlTotal: '1000',
    qtPrestacoes: '5',
    vlPresta: '200',
  };

  const result = validateTotalCurrency(data);
  const expectedError = [];

  expect(result).toEqual(expectedError);
});
