export interface AuthenticateResponse {
	accountId: string;
	title: string;
	firstName: string;
	lastName: string;
	email: string;
	created: string;
	updated: string | null;
	isVerified: boolean;
	token: string;
	avatar: string;
}
