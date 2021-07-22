class Persist {
  namespace: string;

  auth: string | string[] = [];

  constructor(namespace: string) {
    this.namespace = namespace;
  }
}

export default Persist;
