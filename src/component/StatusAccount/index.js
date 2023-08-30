import { createContext, useEffect, useState } from 'react';
import * as loginService from '~/component/Services/loginService';

const StatusAcc = createContext();
function StatusAccount({ children }) {
  const token = localStorage.getItem('token');
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (token) {
      const fetchApi = async () => {
        const result = await loginService.login(JSON.parse(token));
        setData(result.data);
      };
      fetchApi();

      setIsLogin(true);
    } else {
      setIsLogin(false);
      setData([]);
    }
  }, [token]);
  const value = {
    isLogin,
    setIsLogin,
    data,
  };

  return <StatusAcc.Provider value={value}>{children}</StatusAcc.Provider>;
}

export { StatusAccount, StatusAcc };
