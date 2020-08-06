interface IComponent {
	onInit?: Function;
	onScroll?: Function;
	onResize?: Function;
}

export abstract class Component implements IComponent {
	constructor(param?: any) {
		if (param) {
			Object.assign(this, param);
		}

		/* Run function after initialization */
		if (this.onInit) {
			if (this.onInit() === false) {
				return
			}
		}

		/* Run function on resize */
		if (this.onResize) {
			window.addEventListener(
				"resize",
				this.onResize,
				false
			);
		}

		/* Run function on scroll */
		if (this.onScroll) {
			window.addEventListener("scroll", () => {
				this.onScroll();
			});
			this.onScroll();
		}

		if (this.onInit) {
			this.onInit();
		}
	}

	/**
	* Run function when user scroll
	*/
	onScroll?(): void;

	/**
	* Run function when user resize browser
	*/
	onResize?(): void;

	/**
	* Callback to be run on initialization.
	* @defaultValue false
	*/
	onInit?(): void | Promise<void> | boolean | Promise<boolean>;
}
