import { useEffect } from "react";
import { logout_disconnect } from "../../api";

export default function AppLogout() {

    useEffect(() => {

        logout_disconnect();

    }, []);

    return (
        <div>
            <h1>React + Odoo Logout</h1>
        </div>
    );
}