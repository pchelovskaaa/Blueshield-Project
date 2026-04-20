function calculateInsurance() {
  const type = document.getElementById('insuranceType').value;
  const amount = Number(document.getElementById('amount').value);
  const term = Number(document.getElementById('term').value);
  const legal = document.getElementById('legal').checked;
  const support = document.getElementById('support').checked;
  const urgent = document.getElementById('urgent').checked;
  const resultBox = document.getElementById('result');

  const config = {
    auto: { base: 0.034, label: 'Автострахування' },
    travel: { base: 0.021, label: 'Туристичне страхування' },
    health: { base: 0.028, label: 'Медичне страхування' },
    property: { base: 0.019, label: 'Страхування майна' }
  };

  if (!type || !amount || !term) {
    resultBox.innerHTML = '<strong>Будь ласка, заповніть тип страхування, страхову суму та термін дії.</strong>';
    return;
  }

  const termCoefMap = { 6: 0.72, 12: 1, 24: 1.82 };
  const serviceFee = (legal ? 650 : 0) + (support ? 480 : 0) + (urgent ? 900 : 0);
  const premium = amount * config[type].base * termCoefMap[term] + serviceFee;
  const rounded = Math.round(premium);

  const extras = [];
  if (legal) extras.push('юридична консультація');
  if (support) extras.push('підтримка 24/7');
  if (urgent) extras.push('термінове оформлення');

  resultBox.innerHTML = `
    <div class="result-price">${rounded.toLocaleString('uk-UA')} грн</div>
    <p class="result-note">Орієнтовна вартість для продукту «${config[type].label}» на ${term} міс.${extras.length ? ' Додатково включено: ' + extras.join(', ') + '.' : ''}</p>
  `;
}

function markActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', markActiveNav);
