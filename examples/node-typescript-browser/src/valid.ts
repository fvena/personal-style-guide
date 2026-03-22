export function getElement(id: string): HTMLElement | null {
  return document.querySelector(`#${id}`)
}

export function setTitle(title: string): void {
  document.title = title
}

export function addClickListener(element: HTMLElement, callback: () => void): void {
  element.addEventListener('click', callback)
}
