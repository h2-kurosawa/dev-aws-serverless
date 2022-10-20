import { middyfy } from '@libs/lambda'
// add sqs API削除したgoodbyeで実装してみる..
import { SQSHandler } from 'aws-lambda'
import { fromEnv } from '@aws-sdk/credential-providers'
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'

const client = new SQSClient({ region: 'ap-northeast-1', credentials: fromEnv() })

const goodbye: SQSHandler = async (event, _c) => {
	//sqsメッセージを受けとる
	//複数時の対応も実装する..event.Recordsは配列でやってくる
	console.log('QueueからLambda')
	console.log(`event!:: ${event}`)
	// event.Records.forEach((record) => {
	// 	console.log(`record ${record.body}`)
	// })
	//Queue→Lambda→Asteria
	console.log('LambdaからQueue')
	const command = new SendMessageCommand({
		QueueUrl: `https://sqs.ap-northeast-1.amazonaws.com/882132717543/dev-aws-serverless-goodbye-asteria`,
		MessageBody: 'Queue to Asteria',
	})
	try {
		const result = await client.send(command)
		console.log('result', result)
	} catch (err) {
		console.log(err)
	}
}

export const main = middyfy(goodbye)
