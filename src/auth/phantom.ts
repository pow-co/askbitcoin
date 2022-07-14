
interface PhantomAuthParams {
	nonce: string;
	signature: string;
	publickey: string;
}

export async function authenticate(auth: PhantomAuthParams): Promise<Boolean> {
	
	return false

}
