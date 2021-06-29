import React from 'react';
import { isValidJSONString } from '@/utils/isvalid';
import { history } from 'umi';
import { Tag } from 'antd';

export function addFilter({ pathname, key, value, title }) {
  const { query, search } = history.location;
  const filter = encodeURIComponent(JSON.stringify({ key, value, title }));
  const isCurrent = pathname === history.location.pathname;

  if (isCurrent && query.filter) {
    const found = []
      .concat(query.filter)
      .map(decodeURIComponent)
      .filter(isValidJSONString)
      .map((item) => JSON.parse(item))
      .find((item) => item.key === key);
    if (found) {
      console.warn('filter exist');
      return;
    }
  }

  const params = new URLSearchParams(isCurrent ? search : '');
  params.append('filter', filter);
  const searchParams = params.toString();

  history.push({
    pathname,
    search: `?${searchParams}`,
  });
}

export function getFilterParams(filters) {
  if (!filters) {
    return {};
  }
  const f = []
    .concat(filters)
    .map(decodeURIComponent)
    .filter(isValidJSONString)
    .map((item) => JSON.parse(item));
  const obj = f.reduce((prev, curr) => ({ ...prev, [curr.key]: +curr.value }), {});
  return obj;
}

const Filters = (props) => {
  if (!props.filters) {
    return null;
  }

  const filters = []
    .concat(props.filters)
    .map(decodeURIComponent)
    .filter(isValidJSONString)
    .map(JSON.parse);

  const removeFilter = (key) => {
    const newFilters = filters.filter((item) => item.key !== key);
    const searchParams = new URLSearchParams();
    newFilters.forEach((item) => searchParams.append('filter', JSON.stringify(item)));
    history.push({
      pathname: '/online/orders',
      search: `?${searchParams.toString()}`,
    });
  };

  return (
    <div className="flex items-center mb2">
      {filters.map((item) => (
        <div key={item.key}>
          <Tag closable onClose={() => removeFilter(item.key)}>
            {item.title}
          </Tag>
        </div>
      ))}
    </div>
  );
};

export default Filters;
