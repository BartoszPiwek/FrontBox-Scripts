import { protectEmail } from "./protectEmail";

describe('Function protectEmail', () => {
	let body: HTMLBodyElement;

	beforeAll(() => {
		body = document.getElementsByTagName("body")[0];
	});

	it('should set correct email', () => {
		body.insertAdjacentHTML('afterend', `<a href="#" class="isProtected test">moc.liame@elpmaxe</a>`)
		const element = document.querySelector('.test') as HTMLAnchorElement;

		protectEmail(element);

		// element.click();

		expect(element.href).toEqual('mailto:example@email.com');
	});
})