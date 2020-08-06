import { Component } from "../utilities/component";
import { body } from "../utilities/elements";
import { getFileContent } from "../utilities/getFileContent";

export type TModalStates = {
  doing: boolean;
  visible: boolean;
  loading: boolean;
  open: boolean;
}

export interface IModalElement {
  id: string;
  onInit?: () => void;
  onDestroy?: () => void;
}

export interface IModalsService {
  modals: {
    [key: string]: IModalElement;
  }
}

export interface IModalActive extends IModalElement {
  element: HTMLElement;
}

export class ModalsService extends Component {
  private modals: IModalElement[];
  private el: HTMLElement;
  private content: HTMLElement;
  private states: TModalStates;
  private initialized: boolean;

  private currentModal: IModalActive;

  constructor(params: IModalsService) {
    super(params)
  }

  public onInit() {
    this.states = {
      doing: false,
      visible: false,
      loading: false,
      open: false
    };
  }

  public async initialize() {
    body.insertAdjacentHTML('beforeend', await getFileContent(`../modals/template.html`));

    this.el = document.getElementById('modal');
    this.content = document.getElementById('modal-content');

    document.getElementById('modal-button').addEventListener('click', () => {
      this.close();
    });

    this.initialized = true;

    return new Promise(r => setTimeout(r, 100));
  }

  public async open(ID: string) {
    if (this.states.doing) {
      return;
    }

    this.changeState({
      loading: true,
      doing: true
    });

    // TODO: disable page scroll

    if (!this.initialized) {
      await this.initialize();
    }

    this.changeState({
      visible: true
    });

    if (this.currentModal) {
      if (this.currentModal.id === ID) {
        return;
      }

      this.close(false);
    }
    const { id } = this.modals[ID];

    const modalDocument = await getFileContent(`/modals/${id}.html`);
    this.content.insertAdjacentHTML('beforeend', modalDocument);

    this.currentModal = this.modals[ID];

    this.currentModal.element = this.content.firstElementChild as HTMLElement;

    if (this.currentModal.onInit) {
      this.currentModal.onInit();
    }

    this.changeState({
      doing: false,
      loading: false,
      open: true
    });
  }

  public close(triggerScroll = true) {
    if (this.states.doing) {
      return;
    }

    this.changeState({
      doing: true,
      visible: false,
    });

    if (this.currentModal.onDestroy) {
      this.currentModal.onDestroy();
    }

    setTimeout(() => {
      this.currentModal.element.remove();

      this.currentModal = null;

      this.changeState({
        doing: false,
        open: false,
        loading: false
      });

      if (triggerScroll) {
        // TODO: enable page scroll
      }
    }, 600);
  }

  public changeState(states: Partial<TModalStates>) {
    for (const state in states) {
      if (states.hasOwnProperty(state)) {
        const value = states[state];

        this.states[state] = value;

        if (this.el) {
          if (value) {
            this.el.classList.add(`is-${state}`);
          } else {
            this.el.classList.remove(`is-${state}`);
          }
        }
      }
    }
  }
}