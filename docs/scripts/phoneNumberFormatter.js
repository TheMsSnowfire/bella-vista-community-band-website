const cleaveZen = window.cleaveZen;
const { formatGeneral } = cleaveZen;

const inputElement = document.getElementById('phone');

inputElement.addEventListener('input', (event) => {
  const input = event.target;
  const cursorPosition = input.selectionStart;
  const originalLength = input.value.length;

  const formattedValue = formatGeneral(event.currentTarget.value, {
    blocks: [0, 3, 3, 4],
    delimiters: ['(', ')-', '-'],
    delimiterLazyShow: true,
    numericOnly: true,
  });

  input.value = formattedValue;
  const newLength = formattedValue.length;
  const newCursorPosition = cursorPosition + (newLength - originalLength);
  input.setSelectionRange(newCursorPosition, newCursorPosition);
});
