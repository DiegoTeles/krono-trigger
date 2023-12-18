const { isValidCpfCnpj } = require('../utils/cpf-cnpj-validate');

test('Is invalid CPF', () => {
  const nrCpf = '41854274761';
  const result = isValidCpfCnpj(nrCpf);
  expect(result).toEqual([{ tipo: 'CPF inválido' }]);
});

test('Is valid CPF', () => {
  const nrCpf = '03885178087';
  const result = isValidCpfCnpj(nrCpf);
  expect(result).toEqual([]);
});

test('Is invalid CNPJ', () => {
  const nrCpf = '59731188555501';
  const result = isValidCpfCnpj(nrCpf);
  expect(result).toEqual([{ tipo: 'CNPJ inválido' }]);
});

test('Is valid CNPJ', () => {
  const nrCpf = '59731188000190';
  const result = isValidCpfCnpj(nrCpf);
  expect(result).toEqual([]);
});
