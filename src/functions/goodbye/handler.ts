import { middyfy } from '@libs/lambda'
// add sqs API削除したgoodbyeで実装してみる..
import { SQSHandler } from 'aws-lambda'

const goodbye: SQSHandler = async (event, _c) => {
	//sqsメッセージを受けとる
	//複数時の対応も実装する..event.Recordsは配列でやってくる
	console.log(`event!::`)
	console.log(event)
	event.Records.forEach((record) => {
		console.log(`record`, record.body)
	})
}

export const main = middyfy(goodbye)
