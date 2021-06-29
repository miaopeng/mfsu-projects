import { request } from '@/utils/apollo';
import {
  CategoryListQuery,
  VariantListQuery,
  ProductOptions,
  RawProductOptions,
  VariantTagsQuery,
} from './service.graphql';

interface IVariantsParams {
  ids?: string[];
  tags?: string[];
  page?: number;
  perPage?: number;
}

export function VariantList(params: IVariantsParams) {
  return request({
    type: 'query',
    query: VariantListQuery,
    variables: {
      ...params,
      perPage: 5000,
    },
    normalizer: (res: any) => {
      const variants = res.data.variants.nodes;
      return { data: { variants } };
    },
  });
}

export const GetVariantTags = () => request({ type: 'query', query: VariantTagsQuery });

export default {
  product: {
    options: () => request({ type: 'query', query: ProductOptions, fetchPolicy: 'cache-first' }),
  },
  rowProduct: {
    options: () => request({ type: 'query', query: RawProductOptions }),
  },
  category: {
    list: () =>
      request({
        type: 'query',
        query: CategoryListQuery,
        fetchPolicy: 'cache-first',
      }),
  },
};
