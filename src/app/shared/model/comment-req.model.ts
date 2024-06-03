export class CommentReqModel {
	name: string;
	email: string;
	body: string;

	constructor(name: string, email: string, body: string) {
		this.name = name ?? '';
		this.email = email ?? '';
		this.body = body ?? '';
	}

	convert(): any {
		return this;
	}
}
