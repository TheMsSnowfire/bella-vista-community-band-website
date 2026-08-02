const validator = new JustValidate('#contactForm');
const resultMessage = document.getElementById('result-message');
const submitBtn = document.getElementById('submitBtn');

validator
  .addField('#firstName', [
    { rule: 'required', errorMessage: 'First name is required' },
  ])
  .addField('#lastName', [
    { rule: 'required', errorMessage: 'Last name is required' },
  ])
  .addField('#instrument', [
    { rule: 'required', errorMessage: 'Please select an instrument' },
  ])
  .addField('#email', [
    { rule: 'required', errorMessage: 'Email is required' },
    { rule: 'email', errorMessage: 'Please enter a valid email address' },
  ])
  .addField('#phone', [
    { rule: 'required', errorMessage: 'Phone number is required' },
    {
      rule: 'customRegexp',
      value: /\([0-9]{3}\)-[0-9]{3}-[0-9]{4}/,
      errorMessage: 'Enter a valid 10-digit format (e.g., (123)-456-7890)',
    },
  ])
  .addField('#address', [
    { rule: 'required', errorMessage: 'Street address is required' },
  ])
  .addField('#city', [{ rule: 'required', errorMessage: 'City is required' }])
  .addField('#state', [{ rule: 'required', errorMessage: 'State is required' }])
  .addField('#zipcode', [
    { rule: 'required', errorMessage: 'Zip code is required' },
    {
      rule: 'customRegexp',
      value: /^[0-9]{5}(?:-[0-9]{4})?$/,
      errorMessage: 'Please enter a valid 5-digit zip code',
    },
  ])
  .onSuccess((event) => {
    event.preventDefault();

    submitBtn.disabled = true;
    resultMessage.textContent = 'Sending email...';
    resultMessage.style.color = 'black';

    const formData = new FormData(event.target);

    fetch('https://web3forms.com', {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          resultMessage.textContent = 'Email sent successfully!';
          resultMessage.style.color = 'green';
          event.target.reset(); // Clear input fields
        } else {
          resultMessage.textContent = json.message || 'Failed to send email.';
          resultMessage.style.color = '#d9534f';
        }
      })
      .catch((error) => {
        resultMessage.textContent = 'Network error. Please try again.';
        resultMessage.style.color = '#d9534f';
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
