import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

import axios from "../../../api/axiosClient";

const useLogout = () => {

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const logout = async () => {

        try {

            const response = await axios.post(
                "/api/v1/auth/logout"
            );

            console.log(response.data);

        } catch (err) {

            console.log(err);

        }

        setAuth({});

        navigate("/login");
    };

    return logout;
};

export default useLogout;