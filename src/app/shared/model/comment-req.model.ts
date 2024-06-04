export class CommentReqModel {
	name: string;
	email: string;
	body: string;

	constructor(source: any) {
		this.name = source?.fullName ?? '';
		this.email = source?.email ?? '';
		this.body = source?.body ?? '';
	}

	convert(): any {
		return this;
	}
}
