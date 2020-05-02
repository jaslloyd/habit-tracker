const networkHelper = {
  async fetchHelper(uri, requestBody = {}) {
    this.controller = new window.AbortController();
    const requestParameters = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      signal: this.controller.signal,
      ...requestBody,
    };
    let result;

    try {
      result = await (await fetch(uri, requestParameters)).json();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
    return Promise.resolve(result);
  },

  cancelRequest() {
    this.controller.abort();
  },
};

export default networkHelper;
