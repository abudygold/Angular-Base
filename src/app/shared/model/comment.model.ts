export class CommentModel {
	id!: string;
	name!: string;
	email!: string;
	body!: string;

	convert(dto: any): CommentModel {
		this.id = dto.id ?? '';
		this.name = dto.name ?? '';
		this.email = dto.email ?? null;
		this.body = dto.body ?? '';

		return this;
	}
}
