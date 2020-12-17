import * as fs from 'fs';
import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdanode from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';

// export interface BackendProcessor {
//   LambdaProcessorCore: lambda.Code;
// }

export class BackendProcessor extends cdk.Construct {
  public readonly handler: lambda.Function;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const entry = fs.existsSync(path.join(__dirname, 'lambda/handler.js'))
      ? path.join(__dirname, 'lambda/handler.js') // local development
      : path.join(__dirname, 'lambda/handler.js'); // when published in npm


    this.handler = new lambdanode.NodejsFunction(this, 'backend-processor', {
      entry: entry,
      timeout: cdk.Duration.seconds(2),
      runtime: lambda.Runtime.NODEJS_12_X,
      tracing: lambda.Tracing.ACTIVE,
      bundling: {
        minify: true,
        externalModules: [
          'aws-sdk',
        ],
      },
    });
  }
}
