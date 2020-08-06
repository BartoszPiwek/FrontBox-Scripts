import { Component } from "../utilities/component";

interface IExpandContent {
  elements: NodeListOf<HTMLElement>;
  afterInit?: (component: ExpandContent) => void;
}

export class ExpandContent extends Component implements IExpandContent {
  public elements: NodeListOf<HTMLElement>;

  public afterInit: (component: ExpandContent) => void;

  private activeExpandContainer: HTMLElement;
  private isWorking: boolean;

  constructor(params: IExpandContent) {
    super(params);
  }

  public onInit() {
    this.elements.forEach(element => {
      element.addEventListener('click', () => {
        this.setActive(element);
      });
    });

    const activeExpandContainer = document.querySelector('.navigation__item.isActive') as HTMLElement;
    if (activeExpandContainer) {
      this.activeExpandContainer = activeExpandContainer;
    }

    if (this.afterInit) {
      this.afterInit(this);
    }
  }

  public setActive(element: HTMLElement) {
    if (this.isWorking) {
      return;
    }

    this.isWorking = true;

    const elementContainer = element.closest('.navigation__item') as HTMLElement;
    const isSelfClosedElement = elementContainer.classList.contains('isActive');

    if (this.activeExpandContainer) {
      this.activeExpandContainer.classList.remove('isActive');
      this.activeExpandContainer = null;
    }

    if (isSelfClosedElement) {
      this.isWorking = false;
      return;
    }

    elementContainer.classList.add('isActive');
    this.activeExpandContainer = elementContainer;
    this.isWorking = false;
  }
}