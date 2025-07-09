import {useNavigate} from "react-router-dom";
import React, {ReactNode, useEffect} from "react";
import useAuth from "../../hooks/useAuth.ts";
import Loading from "../../pages/loading/Loading.tsx";

type Props = {
    children:ReactNode;
}

const ProtectedRoute:React.FC<Props> = ({children}) => {
    const isAuth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth === false) {
            navigate("/admin/login");
        }
    }, [isAuth, navigate]);

    if (isAuth === null) {
        return <Loading/>;
    }
    return children;
}

export default ProtectedRoute;
