const planningApplication = {
  title: 'Planning application',
  name: 'planning-application',
  type: 'document',
  initialValue: {
    proposedLandUse: {
      classB: false,
      classC: false,
      classE: false,
      classF: false,
      suiGeneris: false
    }
  },
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
      description: 'Use a short name that is used to identify this development or the plot of land, e.g. The Shard or Murphy\'s Yard',
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
      description: 'Select all land use classes that apply',
      name: 'proposedLandUse',
      type: 'object',
      fields: [
        {
          title: 'Class B - Industrial',
          name: 'classB',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'Class C - Residential',
          name: 'classC',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'Class E - Commercial',
          name: 'classE',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'Class F - Community',
          name: 'classF',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'SG - Sui Generis',
          name: 'suiGeneris',
          type: 'boolean',
          options: {
            layout: 'checkbox'
          }
        },
        {
          title: 'SG - Sui Generis Detail',
          description: 'Please specify the use class for Sui Generis',
          name: 'suiGenerisDetail',
          type: 'string',
          hidden: ({document}) => !document?.proposedLandUse.suiGeneris,
          validation: Rule => Rule.custom((field, context) => (context.document.proposedLandUse.suiGeneris && field === undefined) ? "This field must not be empty." : true),
        },
      ]
    },
    {
      title: 'Height',
      description: 'Enter the maximum height in storeys',
      name: 'height',
      type: 'number'
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
          title: 'New residential homes',
          name: 'residentialUnits',
          type: 'number',
        },
        {
          title: 'Affordable residential homes',
          name: 'affordableResidentialUnits',
          type: 'number'
        },
      ]
    },
    {
      title: 'Healthcare impact',
      name: 'showHealthcare',
      type: 'boolean'
    },
    {
      title: 'Additional healthcare demand',
      description: 'As a percentage',
      name: 'healthcareDemand',
      type: 'number',
      hidden: ({document}) => !document?.showHealthcare,
      validation: Rule => Rule.custom((field, context) => (context.document.showHealthcare && field === undefined) ? "This field must not be empty." : true),
    },
    {
      title: 'Open space impact',
      name: 'showOpenSpace',
      type: 'boolean'
    },
    {
      title: 'Open space area in square metres',
      name: 'openSpaceArea',
      type: 'number',
      hidden: ({document}) => !document?.showOpenSpace,
      validation: Rule => Rule.custom((field, context) => (context.document.showOpenSpace && field === undefined) ? "This field must not be empty." : true),
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
      validation: Rule => Rule.custom((field, context) => (context.document.showCarbon && field === undefined) ? "This field must not be empty." : true),
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
      validation: Rule => Rule.custom((field, context) => (context.document.showAccess && field === undefined) ? "This field must not be empty." : true),
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

export default planningApplication
