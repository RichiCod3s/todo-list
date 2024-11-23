export function createElementWithClass(tag, className, innerHTML = "") {
    let element = document.createElement(tag);
    element.classList.add(className);
    element.innerHTML = innerHTML;
    return element;
  }