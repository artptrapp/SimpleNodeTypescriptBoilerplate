import { auth } from 'firebase-admin'

export default class BaseBLO {
    public async createUser(
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ): Promise<auth.UserRecord> {

        const createResult = await auth().createUser({
            displayName: `${firstName} ${lastName}`,
            email,
            password
        })

        return createResult

    }
}
