import type { AWS } from '@serverless/typescript'

import hello from '@functions/hello'
import goodbye from '@functions/goodbye'

const serverlessConfiguration: AWS = {
	service: 'dev-aws-serverless',
	frameworkVersion: '3',
	plugins: ['serverless-esbuild'],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		region: 'ap-northeast-1',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
		},
	},
	// import the function via paths
	functions: {
		hello,
		goodbye,
	},
	// add resource
	resources: {
		Resources: {
			// add Queue
			MyQueue: {
				Type: 'AWS::SQS::Queue',
				Properties: {
					QueueName: 'dev-aws-serverless-goodbye',
					// QueueName: 'dev-aws-serverless-goodbye.fifo',
					// FifoQueue: true,
					MessageRetentionPeriod: 300, //SQSのメッセージ保持時間(秒)
					ReceiveMessageWaitTimeSeconds: 5, //ポーリング待機時間
				},
			},
			//非同期設定...ここか..？
			// AsyncConfig: {
			// 	Type: 'AWS::Lambda::EventInvokeConfig',
			// 	Properties: {
			// 		DestinationConfig: {
			// 			OnSuccess: {
			// 				Destination: {d
			// 					QueueName: 'dev-aws-serverless-goodbye',
			// 				},
			// 			},
			// 		},
			// 	},
			// },
		},
	},
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
}

module.exports = serverlessConfiguration
