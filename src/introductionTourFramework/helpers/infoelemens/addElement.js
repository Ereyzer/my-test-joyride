const elements = [];

// function addLocaleStorage() {
//   localStorage.setItem('elements', JSON.stringify(elements));
// }

export function addElement(oldPath, description, addToDbFunc) {
  let isContainer = false;
  const path = [...oldPath].reverse().reduce((acc, el) => {
    if (el.nodeName && el.nodeName !== '#document') {
      if (isContainer) {
        if (el.getAttribute('name')) {
          acc = `${acc} ${el.localName} [name="${el.getAttribute('name')}"]`;
        } else if (el.getAttribute('href')) {
          acc = `${acc} [href="${el.getAttribute('href')}"]`;
        } else {
          acc = `${acc} ${el.localName}`;
        }
      }
      if (el.getAttribute('tour-attribute')) {
        const attribute = el.getAttribute('tour-attribute');
        const att = `[tour-attribute="${attribute}"]`;
        isContainer = true;
        acc += att;
      }
    }
    return acc;
  }, '');
  elements.push({ path, description });
  // addLocaleStorage();
  addToDbFunc(s => [...s, { path, description }]);
  return elements;
}
