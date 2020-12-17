import json
import categories

def handler(event, context):
    print('request: {}'.format(json.dumps(event))) #TODO: Cambiar por logger
    response = {}
    proxy_path = event['pathParameters']['proxy']
    if proxy_path == '':
        response['statusCode']=200
        response['headers']={'Content-Type': 'application/json'}
        response['body']=json.dumps(event)
    elif proxy_path =='categories':
        response['statusCode']=200
        response['headers']={'Content-Type': 'application/json'}
        response['body']=json.dumps({'categories':categories.categories})

    return response
