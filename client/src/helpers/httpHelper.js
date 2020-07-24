export const httpHelper = async (url,
                                 method = 'GET',
                                 body = null,
                                 headers = {}) => {
  try {
    const response = await fetch(url, {
      method, body, headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return {data};
  } catch (e) {
    throw e;
  }
};
