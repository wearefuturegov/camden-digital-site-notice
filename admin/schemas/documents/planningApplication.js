const planningApplication = {
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
          title: 'New residential units',
          name: 'residentialUnits',
          type: 'number'
        },
        {
          title: 'Affordable residential units',
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

export default planningApplication
