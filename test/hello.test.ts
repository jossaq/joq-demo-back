
import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';

import { BackendProcessor } from '../src';

test('BackendProcessor components', () => {
  // GIVEN
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'MyStack');

  // WHEN
  new BackendProcessor(stack, 'p6-namer');

  // THEN
  expectCDK(stack).to(
    haveResource('AWS::Lambda::Function'),
  );
});