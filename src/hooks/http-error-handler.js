import {useState, useEffect} from 'react';

export default httpClient => {
  const [error, setError] = useState(null);
    
  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
      return req;
    });

  const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
    setError(err);
  });

  const errorConfirmHandler = () => {
    setError(null);
  }
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    }
  }, [reqInterceptor, resInterceptor]);
  

  return [error, errorConfirmHandler];
}