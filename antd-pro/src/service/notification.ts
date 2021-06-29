import { request } from '@/utils/apollo';
import { Notifications } from './notification.graphql';

export function notificationQuery() {
  return request({ type: 'query', query: Notifications, context: { silent: true } });
}
