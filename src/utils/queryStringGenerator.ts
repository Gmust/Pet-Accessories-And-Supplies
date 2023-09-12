import * as qs from 'qs';

interface QueryStringGeneratorParams {
  queryValues: string[],
  customName: string
}

export const queryStringGenerator = ({ queryValues, customName }: QueryStringGeneratorParams) => {

  const query = qs.stringify({
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
  return query;
};
//
// [
//   {
//     brand: {
//       name: {
//         $eq: 'WHISKAS',
//       },
//     },
//   },
//   {
//     brand: {
//       name: {
//         $eq: 'FELIX',
//       },
//     },
//   },
// ],