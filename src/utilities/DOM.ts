/**
 * Manipulate elements on DOM
 */

/** Get HTMLElement by ID */
export const getElementByID = (value: string): HTMLElement => {
  return document.getElementById(value);
}

/** Get HTMLElements by value */
export const getElements = (value: string, areaToSearch: DocumentFragment = document): NodeListOf<HTMLElement> => {
  return areaToSearch.querySelectorAll(value);
}

/** Get HTMLElement by value */
export const getElement = (value: string, areaToSearch: DocumentFragment = document): HTMLElement => {
  return areaToSearch.querySelector(value);
}