import { middyfy } from '@libs/lambda'

const goodbye = async (event) => {
	return {
		message: `Goodbye ${event.body.name}, welcome to the exciting Serverless world!`,
		event,
	}
}

export const main = middyfy(goodbye)
