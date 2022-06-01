import {APIGatewayProxyHandler} from 'aws-lambda';
import {metricScope, Unit} from 'aws-embedded-metrics';

const getRandom = (min: number, max: number): number =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

const getFruit = () => {
  const fruits = ['apple', 'banana', 'orange'];
  return fruits[getRandom(0, fruits.length - 1)];
};

export const handler: APIGatewayProxyHandler = metricScope(
  metrics => async () => {
    metrics.setNamespace('DemoAwsEmbeddedMetrics');
    metrics.putDimensions({Service: 'MyService'});
    metrics.putMetric(
      'ProcessingLatency',
      getRandom(50, 150),
      Unit.Milliseconds
    );
    metrics.putMetric('Warnings', getRandom(0, 10), Unit.Count);
    metrics.setProperty('Fruit', getFruit());

    return {
      statusCode: 200,
      body: '',
    };
  }
);
