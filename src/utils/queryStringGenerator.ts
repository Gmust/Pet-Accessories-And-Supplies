import * as qs from 'qs';

interface QueryStringGeneratorParams {
  queryValues: string[],
  customName: string,
  type: 'firstArg' | 'secondArg'
}

export const queryStringGenerator = ({ queryValues, customName, type }: QueryStringGeneratorParams) => {

  let query;

  if (type === 'firstArg') {
    query = qs.stringify({
      filters: {
        $or: queryValues.map((str) => {
          return {
            [customName]: {
              name: {
                $eq: str,
              },
            },
          };
        }),
      },
    }, {
      encodeValuesOnly: true,
    });
  } else if (type === 'secondArg') {
    query = qs.stringify({
      filters: {
        $and: queryValues.map((str) => {
          return {
            [customName]: {
              name: {
                $eq: str,
              },
            },
          };
        }),
      },
    }, {
      encodeValuesOnly: true,
    });
  }
  query = query!.replace('filters[$and][0]', 'filters[$and][1]');
  query = query!.replace('filters[$and][2]', 'filters[$and][1]');
  query = query!.replace('filters[$and][3]', 'filters[$and][1]');
  return query;
};
