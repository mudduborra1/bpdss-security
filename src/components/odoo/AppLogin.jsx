import { useEffect } from "react";
import { login_connect } from "../../api";

export default function AppLogin() {

    useEffect(() => {

        login_connect();

    }, []);

    return (
        <div>
            <h1>React + Odoo Login</h1>
        </div>
    );
}