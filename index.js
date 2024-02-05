var select = document.querySelectorAll('.currency'),
    input_currency = document.getElementById('input_currency'),
    output_currency = document.getElementById('output_currency');

const host = 'api.frankfurter.app';
fetch(`https://${host}/currencies`)
  .then((data) => data.json())
  .then((data) => {
    const entries = Object.entries(data); // Corrected line
    // console.log(entries);
    //alert(`10 GBP = ${data.rates.USD} USD`);
    for(i =0; i < entries.length; i++){
      select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
      select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`
    }
  });

  function converter(){
    var input_currency_val = input_currency.value;
    if(select[0].value != select[1].value) {
      const host = 'api.frankfurter.app';
      fetch(`https://${host}/latest?amount=${input_currency_val}&from=${select[0].value}&to=${select[1].value}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming the conversion rate is directly accessible as 'rates'
          const conversionRate = data.rates[select[1].value];
          if (conversionRate) {
            output_currency.value = input_currency_val * conversionRate;
          } else {
            console.error('Conversion rate not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching conversion data:', error);
        });
    } else {
      alert('Please select two different currencies');
    }
}
