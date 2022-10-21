// import schema from './schema'
import { handlerPath } from '@libs/handler-resolver'

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [{ sqs: 'arn:aws:sqs:ap-northeast-1:882132717543:dev-aws-serverless-goodbye' }],
	destinations: {
		onSuccess: 'arn:aws:sqs:ap-northeast-1:882132717543:dev-aws-serverless-goodbye-asteria',
	},
}
