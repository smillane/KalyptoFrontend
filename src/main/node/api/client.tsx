export default async function client(endpoint: string, type: string) {
  const config = {
    method: type,
    mode: 'same-origin',
  };
  try {
    const response = await fetch(`http://localhost:8080/${endpoint}`, { method: type });
    const data = await response.json();
    console.log('client', data);
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        response,
        data,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    console.error(err);
    return Promise.reject(err.message);
  }
}
