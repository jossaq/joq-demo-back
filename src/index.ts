import * as fs from 'fs';
import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdapython from '@aws-cdk/aws-lambda-python';
import * as cdk from '@aws-cdk/core';

// export interface BackendProcessor {
//   LambdaProcessorCore: lambda.Code;
// }

export class BackendProcessor extends cdk.Construct {
  public readonly handler: lambda.Function;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const entry = fs.existsSync(path.join(__dirname, 'lambda'))
      ? path.join(__dirname, 'lambda') // local development
      : path.join(__dirname, 'lambda'); // when published in npm

    this.handler = new lambdapython.PythonFunction(this, 'backend-processor', {
      entry: entry,
      handler: 'handler.handler',
      runtime: lambda.Runtime.PYTHON_3_8,
    });
  }
}
