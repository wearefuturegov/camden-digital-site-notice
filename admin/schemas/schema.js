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
          required: true
        },
        {
          title: 'Name of development',
          description: 'Use a short title that describes this development',
          name: 'name',
          type: 'string'
        }
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
