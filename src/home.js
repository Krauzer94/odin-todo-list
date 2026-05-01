function getMainElement() {
  return document.getElementById('content');
};

function helloWorld() {
    const helloWorldElement = document.createElement('h1');
    helloWorldElement.textContent = "Hello World!";
    getMainElement().appendChild(helloWorldElement);
};

export { helloWorld };
