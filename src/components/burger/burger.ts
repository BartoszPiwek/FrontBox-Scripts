import { Component } from "../../utilities/component";

interface IBurger {
	button: HTMLElement;
	container?: HTMLElement;
	overlay?: HTMLElement;
	expandTime?: number;
	cssClasses?: {
		active: string;
	}
}

/** Class representing a standard manager in your company */
export class Burger extends Component {
	private button: HTMLButtonElement;
	private container?: HTMLElement;
	private overlay?: HTMLElement;

	private active: boolean = false;
	private running: boolean = false;

	private expandTime: number = 200;

	private cssClasses: {
		active: 'isBurgerActive'
	}

	/**
		* Creates a manager
		* @param {string} name Name of the manager
		* @param {Project[]} projects List of projects
		*/
	constructor(param: IBurger) {
		super(param);
	}

	public onInit() {
		this.button.onclick = () => {
			this.toggle();
		};

		if (this.overlay) {
			this.overlay.onclick = () => {
				this.toggle();
			};
		}
	}

	public onResize() {
		// TODO: check breakpoint for burger
		if (this.active) {
			// if (this.active && browser.width > breakpointsSpecial.burgerShow.value) {
			this.toggle();
		}
	}

	private toggle() {
		if (this.running) {
			return false;
		}
		this.running = true;
		this.active = !this.active;

		// TODO: change scroll active
		// scroll.change(this.active);
		if (this.container) {
			this.container.classList.toggle(this.cssClasses.active);
		}

		window.setTimeout(() => {
			this.running = false;
		}, this.expandTime);
	}
}
