// import { client } from '@/utils/apollo';
import { SignMeIn } from './user.graphql';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
}

export async function login(params: LoginParamsType) {
  const { userName, password } = params;
  const variables = { input: { phone: userName || '', password } };
  // return client.mutate({ mutation: SignMeIn, variables });
}
