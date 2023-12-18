function validateTotalCurrency(data) {
  const errors = [];
  const vlTotal = parseFloat(data.vlTotal);
  const qtPrestacoes = parseFloat(data.qtPrestacoes);
  const vlPresta = parseFloat(data.vlPresta);

  const calculatedVlPresta = vlTotal / qtPrestacoes;

  if (calculatedVlPresta !== vlPresta) {
    errors.push({ values: 'Valores de prestações inconsistentes' });
  }

  return errors
}

module.exports = { validateTotalCurrency };
