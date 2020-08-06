import { Component } from "../utilities/component";
import { html } from "../utilities/elements";

interface IScroll {
	top: number;
	bottom: number;
	speed: number;
	direction: string;
}

/**
 * @class Browser
 */
export class Browser extends Component {
	public scroll: IScroll;
	public width: number;
	public height: number;
	public portable: string | boolean;
	private _scrollbarWidth: number;

	public documentHeight: number;

	private _transitionEvent: string;

	constructor() {
		super();
	}

	public onResize() {
		this.calculatePage();
	}

	public onScroll() {
		/* Check last center */
		let lastTop = 0;
		if (this.scroll) {
			lastTop = this.scroll.top;
		}

		/* Prepare variables */
		let direction: string;
		let top = this.scrollPosition;
		let bottom = top + this.height;
		let speed = Math.abs(lastTop - top);

		/* Check scroll direction */
		if (top < lastTop) {
			direction = "up";
		} else {
			direction = "down";
		}

		this.scroll = {
			top: top,
			bottom: bottom,
			speed: speed,
			direction: direction
		};
	}

	public get scrollbarWidth(): number {
		if (!this._scrollbarWidth) {
			const scrollbar: HTMLElement = document.getElementById(
				"js_check-scrollbar"
			);
			const content: Element = scrollbar.children.item(0);

			this._scrollbarWidth = scrollbar.offsetWidth - content.clientWidth;
			scrollbar.parentNode.removeChild(scrollbar);
		}

		return this._scrollbarWidth;
	}

	public get transitionEvent(): string {
		if (!this._transitionEvent) {
			const element = document.createElement("getTransitionEvent");
			const transitions = {
				transition: "transitionend",
				OTransition: "oTransitionEnd",
				MozTransition: "transitionend",
				WebkitTransition: "webkitTransitionEnd"
			};

			for (const key in transitions) {
				if (element.style[key] !== undefined) {
					this._transitionEvent = transitions[key];
					break;
				}
			}
		}

		return this._transitionEvent;
	}

	public get orientation(): "portrait" | "landscape" {
		if (window.matchMedia("(orientation: portrait)").matches) {
			return "portrait";
		} else {
			return "landscape";
		}
	}

	public get responsive(): string {
		// TODO: Set breakpoints
		// for (const element of breakpoints.reverse()) {
		// 	if (window.matchMedia(`(min-width: ${element.value}px)`).matches) {
		// 		return element.name;
		// 	}
		// }
		return 'foo';
	}

	public get scrollPosition(): number {
		return window.pageYOffset || html.scrollTop;
	}

	public get isScrollbar(): boolean {
		return window.innerWidth != document.documentElement.clientWidth;
	}

	private calculatePage(): void {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		const body = document.body,
			html = document.documentElement;

		this.documentHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
	}
}
