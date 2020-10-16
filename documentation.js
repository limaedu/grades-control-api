export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'This is a sample API to manage and consult grades',
    version: '1.0.0',
    title: 'Grades control',
    contact: {
      email: 'lima.edu@poli.ufrj.br',
    },
  },
  host: 'grades-control-my-api.herokuapp.com/',
  tags: [
    {
      name: 'grades',
      description: 'Grades managament',
    },
  ],
  schemes: ['http'],
  paths: {
    '/grades': {
      post: {
        tags: ['grades'],
        summary: 'Add a new grade',
        description: '',
        operationId: 'addGrade',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Create a new grade with the recieved parameters',
            required: true,
            schema: {
              $ref: '#/definitions/postExample',
            },
          },
        ],
        responses: {
          200: {
            description: 'Sucessful operation',
          },
          400: {
            description: 'Error occured',
          },
        },
      },
      get: {
        tags: ['grades'],
        summary: 'Get all the grades',
        description: '',
        operationId: 'getAllGrades',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Sucessful operation',
            schema: {
              items: {
                $ref: '#/definitions/getExample',
              },
            },
          },
          400: {
            description: 'Error occured',
          },
        },
      },
    },
    '/grades/{id}': {
      get: {
        tags: ['grades'],
        summary: 'Find grade by ID',
        description: 'Return a single grade',
        operationId: 'getGradeById',
        produces: ['aplication/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of grade to return',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              items: {
                $ref: '#/definitions/getExample',
              },
            },
          },
          400: {
            description: 'ID Not found',
          },
        },
      },
      delete: {
        tags: ['grades'],
        summary: 'Delete grade by ID',
        description: '',
        operationId: 'deleteGradeById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of grade to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation ',
          },
          400: {
            description: 'ID Not found',
          },
        },
      },
      put: {
        tags: ['grades'],
        summary: 'Change information on a grade by ID',
        description: '',
        operationId: 'putGradeById',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Informations to be changed',
            required: true,
            schema: {
              $ref: '#/definitions/putExample',
            },
          },
          {
            name: 'id',
            in: 'path',
            description: 'ID of grade to be changed',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation ',
          },
          400: {
            description: 'ID Not found',
          },
        },
      },
    },
    '/grades/totalGrade/{student}/{subject}': {
      get: {
        tags: ['grades'],
        summary: 'Get the total grade of a student in a specific subject',
        description: 'Returns a number',
        operationId: 'getTotalGrade',
        produces: ['string'],
        parameters: [
          {
            name: 'student',
            in: 'path',
            description: 'Student of total grade to be returned',
            required: true,
            type: 'string',
          },
          {
            name: 'subject',
            in: 'path',
            description: 'Subject of total grade to be returned',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/getTotalGradeExample',
            },
          },
          400: {
            description: 'Error occured',
          },
        },
      },
    },
    '/grades/average/{subject}/{type}': {
      get: {
        tags: ['grades'],
        summary: 'Get average grade',
        description: 'Returns a number',
        operationId: 'getAverage',
        produces: ['string'],
        parameters: [
          {
            name: 'subject',
            in: 'path',
            description: 'Subject of average grade to be returned',
            required: true,
            type: 'string',
          },
          {
            name: 'type',
            in: 'path',
            description: 'Type of average grade to be returned',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/getAverageExample',
            },
          },
          400: {
            description: 'Error occured',
          },
        },
      },
    },
    '/grades/threeBest/{subject}/{type}': {
      get: {
        tags: ['grades'],
        summary: 'Get the Three Best grades',
        description: '',
        operationId: 'getThreeBest',
        produces: ['aplication/json'],
        parameters: [
          {
            name: 'subject',
            in: 'path',
            description: 'Subject of three best grades to be returned',
            required: true,
            type: 'string',
          },
          {
            name: 'type',
            in: 'path',
            description: 'Type of three best grades to be returned',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/getThreeBestExample',
            },
          },
          400: {
            description: 'Error occured',
          },
        },
      },
    },
  },
  definitions: {
    postExample: {
      type: 'object',
      properties: {
        student: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        value: {
          type: 'integer',
        },
      },
      example: {
        student: 'Eduardo Lima',
        subject: 'MongoDB',
        type: 'Final exam',
        value: 100,
      },
    },
    getExample: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        student: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        value: {
          type: 'integer',
        },
        timestamp: {
          type: 'string',
        },
      },
      example: {
        id: 1,
        student: 'Verônica Sá',
        subject: 'React',
        type: 'First exam',
        value: 100,
        timestamp: '2020-05-19T18:21:24.958Z',
      },
    },
    putExample: {
      type: 'object',
      properties: {
        student: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        value: {
          type: 'integer',
        },
      },
      example: {
        student: 'Claudia Regina',
        subject: 'NodeJS',
        type: 'Midterm exam',
        value: 90,
      },
    },
    getTotalGradeExample: {
      type: 'string',
      properties: {
        TotalGrade: {
          type: 'string',
        },
      },
      example: 'Total Grade: 70',
    },
    getAverageExample: {
      type: 'string',
      properties: {
        Average: {
          type: 'string',
        },
      },
      example: 'Average: 80.25',
    },
    getThreeBestExample: {
      type: 'array',
      items: {
        type: 'object',
      },
      properties: {
        id: {
          type: 'integer',
        },
        student: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        value: {
          type: 'integer',
        },
        timestamp: {
          type: 'string',
        },
      },
      example: [
        {
          id: 20,
          student: 'Flávio Cavalcanti',
          subject: 'JavaScript',
          type: 'Final exam',
          value: 100,
          timestamp: '2020-05-19T18:21:24.958Z',
        },
        {
          id: 50,
          student: 'Luis Henrique',
          subject: 'JavaScript',
          type: 'Final exam',
          value: 95,
          timestamp: '2020-05-19T18:21:25.171Z',
        },
        {
          id: 13,
          student: 'Jean Fagundes',
          subject: 'JavaScript',
          type: 'Final exam',
          value: 90,
          timestamp: '2020-05-23T22:20:19.200Z',
        },
      ],
    },
  },
};
