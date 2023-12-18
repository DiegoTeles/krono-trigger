const { cpf, cnpj } = require('cpf-cnpj-validator');

function isValidCpfCnpj(nrCpfCnpj) {
  const errors = [];
  if (nrCpfCnpj.length === 11) {
    if (!cpf.isValid(nrCpfCnpj)) {
      errors.push({ tipo: 'CPF inválido' });
    }
  } else if (nrCpfCnpj.length === 14) {
    if (!cnpj.isValid(nrCpfCnpj)) {
      errors.push({ tipo: 'CNPJ inválido' });
    }
  } else {
    errors.push({ tipo: 'Tamanho inválido de CPF ou CNPJ' });
  }
  return errors;
}

module.exports = { isValidCpfCnpj };
