const form = document.querySelector("form");
const input = form.querySelector("input");
const messages = document.querySelector(".messages");
const bodyMessages = document.querySelector("#messages");

/* FAZER O SCROLL PARA A ÚLTIMA MENSAGEM */
messages.lastElementChild.scrollIntoView()


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const messageValue = input.value;
  console.log(messageValue)
  input.value = "";

  // Adicionar mensagem enviada pelo usuário na página
  const messageElement = document.createElement("div");
  messageElement.className = "message you";

  const messageTop = document.createElement("div");
  messageTop.className = "top";
  messageTop.textContent = "Você - " + new Date().toLocaleTimeString();

  const messageBody = document.createElement("div");
  messageBody.className = "body";
  messageBody.textContent = messageValue;

  messageElement.appendChild(messageTop);
  messageElement.appendChild(messageBody);
  messages.appendChild(messageElement);
  bodyMessages.scrollTop = messages.scrollHeight;

  // Fazer requisição à API da OpenAI
  const response = await fetch("https://api.openai.com/v1/engines/davinci/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      prompt: messageValue,
      max_tokens: 100,
      temperature: 0.5
    })
  });

  const data = await response.json();
  const answer = data.choices[0].text;

  // Adicionar resposta da API da OpenAI na página
  const responseElement = document.createElement("div");
  responseElement.className = "message";

  const responseTop = document.createElement("div");
  responseTop.className = "top";
  responseTop.textContent = "Inteligência Artificial - " + new Date().toLocaleTimeString();

  const responseBody = document.createElement("div");
  responseBody.className = "body";
  responseBody.textContent = answer;

  responseElement.appendChild(responseTop);
  responseElement.appendChild(responseBody);
  messages.appendChild(responseElement);
  bodyMessages.scrollTop = messages.scrollHeight;
});
