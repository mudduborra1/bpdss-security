import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "../../../api/axiosClient";

const useLogout = (location) => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    return async () => {
        await axios('/user/logout', {
            withCredentials: true
        }).catch(() => {});

        setAuth({});
        
        if(location) {
            navigate('/', { state: { from: location }, replace: true });
        } else { navigate('/login') }
    }
}

export default useLogout;