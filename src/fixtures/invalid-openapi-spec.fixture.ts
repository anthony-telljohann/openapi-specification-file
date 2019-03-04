import { Spec } from 'swagger-schema-official'
export const invalidSpec: Spec = {
  swagger: '2.0',
  info: {
    description: 'The cats API description',
    version: '1.0',
    title: 'Cats example'
  },
  basePath: '/',
  tags: [
    {
      name: 'cats',
      description: ''
    },
    {
      name: 'cats',
      description: ''
    }
  ],
  schemes: ['http'],
  securityDefinitions: {
    bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  paths: {
    '/cats': {
      post: {
        summary: 'Create cat',
        parameters: [
          {
            name: 'CreateCatDto',
            required: true,
            in: 'body',
            schema: {
              $ref: '#/definitions/CreateCatDto'
            }
          }
        ],
        responses: {
          '201': {
            description: 'The record has been successfully created.'
          },
          '403': {
            description: 'Forbidden.'
          }
        },
        tags: ['cats'],
        produces: ['application/json'],
        consumes: ['application/json']
      }
    },
    '/cats/{id}': {
      get: {
        parameters: [
          {
            type: 'string',
            name: 'id',
            required: true,
            in: 'path'
          }
        ],
        responses: {
          '200': {
            description: ''
          }
        },
        tags: ['cats'],
        produces: ['application/json'],
        consumes: ['application/json']
      }
    }
  },
  definitions: {
    CreateCatDto: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        },
        breed: {
          type: 'string'
        }
      },
      required: ['name', 'age', 'breed']
    }
  }
}
