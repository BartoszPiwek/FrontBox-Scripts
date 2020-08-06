import { Burger } from "./burger";

describe('Burger Component', () => {
  let body: HTMLBodyElement;

  beforeEach(() => {
    body = document.getElementsByTagName("body")[0];
  })

  it('should create', () => {
    body.insertAdjacentHTML('afterend', `<button type="button" id="test-button">Button</button>`)

    const button = document.getElementById('test-button');

    const BurgerComponent = new Burger({
      button,
    })

    expect(BurgerComponent).toBeTruthy();
  });
})