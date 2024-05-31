export class ResourceReqModel {
	name: string;
	age: number;
	colour: string;

	constructor(name: string, age: number, colour: string) {
		this.name = name ?? '';
		this.age = age ?? '';
		this.colour = colour ?? '';
	}

	convert(): any {
		return this;
	}
}
