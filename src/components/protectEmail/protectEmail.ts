/** Protect email */
export function protectEmail(params: NodeList | Element) {
	if (!params) {
		return;
	}

	function onClick(this: HTMLElement, e: MouseEvent): EventListener {
		const link: HTMLElement = this;
		const email = link.textContent
			.split('')
			.reverse()
			.join('');

		link.setAttribute('href', `mailto:${email}`);
		link.classList.remove('isProtected');
		link.textContent = email;
		link.parentNode.replaceChild(link.cloneNode(true), link);

		link.click();

		link.removeEventListener('click', onClick);

		return;
	}

	if ('length' in params) {
		params.forEach(element => {
			element.addEventListener('click', onClick);
		});
	} else {
		params.addEventListener('click', onClick);
	}
}

