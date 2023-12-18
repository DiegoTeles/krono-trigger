const fs = require('fs');
const csv = require('csv-parser');
const { numberFormatter } = require('./utils/currencyFormat');
const { isValidCpfCnpj } = require('./utils/cpf-cnpj-validate');
const { validateTotalCurrency } = require('./utils/validateTotalCurrency');
const { formatDate } = require('./utils/formatDate');

const results = [];

fs.createReadStream('./data.csv')
  .pipe(csv({ separator: ',' }))
  .on('data', (data) => {
    const formattedItem = {};
    const errors = [];

    Object.keys(data).forEach((key) => {
      if (key === 'dtContrato' || key === 'dtVctPre') {
        formattedItem[key.trim()] = formatDate(data[key].trim());
      } else if (!isNaN(data[key]) && key.startsWith('vl')) {
        formattedItem[key.trim()] = numberFormatter.format(
          parseFloat(data[key])
        );
      } else {
        formattedItem[key.trim()] = data[key];
      }
    });

    // Valida CNPJ/CPF
    const cpfCnpjErrors = isValidCpfCnpj(data);

    // Valida valores das prestações
    const prestacoesErrors = validateTotalCurrency(data);

    // Faz Push dos erros no array de resultados
    errors.push(...cpfCnpjErrors, ...prestacoesErrors);

    if (errors.length > 0) {
      formattedItem.status = errors;
    } else {
      formattedItem.status = null;
    }

    // Faz Push no array de resultados antes dos errors
    results.unshift(formattedItem);
  })
  .on('end', () => {
    const jsonResult = JSON.stringify(results, null, 2);

    fs.writeFile('output.json', jsonResult, 'utf8', (err) => {
      if (err) {
        console.error('Erro ao exportar para JSON:', err);
        return;
      }
      console.log('Exportação para JSON concluída com sucesso!');
    });
  });
