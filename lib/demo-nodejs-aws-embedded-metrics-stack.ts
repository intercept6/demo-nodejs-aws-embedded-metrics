import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {LambdaRestApi} from 'aws-cdk-lib/aws-apigateway';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';

export class DemoNodejsAwsEmbeddedMetricsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = new NodejsFunction(this, 'Handler', {
      entry: 'lib/handler.ts',
    });
    new LambdaRestApi(this, 'Api', {handler});
  }
}
