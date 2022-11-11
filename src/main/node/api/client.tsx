export default async function client(endpoint: string, type: string) {
  const config = {
    method: type,
    mode: 'same-origin',
  };
  try {
    console.log(endpoint);
    console.log(type);
    const response = await fetch(`localhost:8080/${endpoint}`, config);
    console.log(response);
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
    console.log(err);
    return Promise.reject(err.message);
  }
}
