export default async function client(endpoint: string, type: string) {
  const config = {
    method: type,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await window.fetch(endpoint, config);
    const data = await response.json();
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message);
  }
}
