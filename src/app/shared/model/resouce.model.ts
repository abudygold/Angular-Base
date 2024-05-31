export class ResourceModel {
	id!: string;
	name!: string;
	age!: number;
	colour!: string;

	convert(dto: any): ResourceModel {
		this.id = dto._id ?? '';
		this.name = dto.name ?? '';
		this.age = dto.age ?? null;
		this.colour = dto.colour ? this.capitalizeFirstLetter(dto.colour) : '';

		return this;
	}

	private capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
