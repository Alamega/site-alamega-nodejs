function hello() {
  let input = document.getElementById("input_hello");
  let result = document.getElementById("result_hello");
  let checkbox = document.getElementById("checkbox_hello");
  let synth = window.speechSynthesis;
  let resultMessage = "";
  if (input.value.length > 30) {
    resultMessage = "Ахахаха как смешно (нет)";
  } else {
    resultMessage = "Здравствуйте, " + input.value + " !";
  }
  result.innerHTML = resultMessage;
  const message = new SpeechSynthesisUtterance(resultMessage);

  message.rate = 3;

  if (checkbox.checked) {
    synth.speak(message);
  }
}
