import {useNavigate} from "react-router-dom";
import React, {ReactNode} from "react";
import useAuth from "../../hooks/useAuth.ts";

type Props = {
    children:ReactNode;
}

const ProtectedRoute:React.FC<Props> = ({children}) => {
    const isAuth = useAuth();
    const navigate = useNavigate();

    if (isAuth === null) {
        return <div>Loading...</div>;
    }

    if (!isAuth) {
        navigate("/login");
    }

    return children;
}

export default ProtectedRoute;
