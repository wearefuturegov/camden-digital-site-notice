// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    {
      title: 'Planning application',
      name: 'planning-application',
      type: 'document',
      fields: [
        {
          title: 'Application number',
          description: 'Make sure this exactly matches the Camden application number, e.g. 2021/1000/P',
          name: 'applicationNumber',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          title: 'Name of development',
          description: 'Use a short title that describes this development',
          name: 'name',
          type: 'string'
        },
        {
          title: 'Massings image',
          name: 'massings',
          type: 'image'
        },
        {
          title: 'Proposed land use',
          name: 'proposedLandUse',
          type: 'string'
        },
        {
          title: 'Height',
          name: 'height',
          type: 'string'
        },
        {
          title: 'Estimated construction time',
          name: 'constructionTime',
          type: 'string'
        },
        {
          title: 'Housing impact',
          name: 'showHousing',
          type: 'boolean'
        },
        {
          title: 'Housing',
          name: 'housing',
          type: 'object',
          hidden: ({document}) => !document?.showHousing,
          fields: [
            {
              title: 'New residential units',
              name: 'residentialUnits',
              type: 'number'
            },
            {
              title: 'Affordable residential units',
              name: 'affordableResidentialUnits',
              type: 'number'
            },
            {
              title: 'Additional healthcare demand',
              description: 'As a percentage',
              name: 'healthcareDemand',
              type: 'number'
            },
          ]
        },
        {
          title: 'Open space impact',
          name: 'showOpenSpace',
          type: 'boolean'
        },
        {
          title: 'Open space',
          name: 'openSpace',
          type: 'object',
          hidden: ({document}) => !document?.showOpenSpace,
          fields: [
            {
              title: 'Area in square metres',
              name: 'area',
              type: 'number'
            },
            {
              title: 'Access type',
              name: 'accessType',
              type: 'string',
              options: {
                list: [
                  {title: 'Restricted', value: 'restricted'},
                  {title: 'Unrestricted', value: 'unrestricted'}
                ]
              }
            }
          ]
        },
        {
          title: 'Jobs impact',
          name: 'showJobs',
          type: 'boolean'
        },
        {
          title: 'New jobs',
          name: 'jobs',
          type: 'object',
          hidden: ({document}) => !document?.showJobs,
          fields: [
            {
              title: 'Minimum',
              name: 'min',
              type: 'number'
            },
            {
              title: 'Maximum',
              name: 'max',
              type: 'number'
            }
          ]
        },
        {
          title: 'Carbon impact',
          name: 'showCarbon',
          type: 'boolean'
        },
        {
          title: 'Percentage change in CO2 emissions',
          name: 'carbonEmissions',
          type: 'number',
          hidden: ({document}) => !document?.showCarbon,
        },
        {
          title: 'Pedestrian and vehicle access',
          name: 'showAccess',
          type: 'boolean'
        },
        {
          title: 'Pedestrian and vehicle access',
          name: 'access',
          type: 'text',
          hidden: ({document}) => !document?.showAccess,
        },
      ],
      orderings: [
        {
          title: 'Application No, descending',
          name: 'applicationNumberDesc',
          by: [
            {field: 'application_number', direction: 'desc'}
          ]
        },
        {
          title: 'Application No, ascending',
          name: 'applicationNumberDesc',
          by: [
            {field: 'application_number', direction: 'asc'}
          ]
        }
      ],
      preview: {
        select: {
          title: 'applicationNumber',
          subtitle: 'name'
        }
      }
    }
  ]),
})
