import apiClient from "@/lib/api-client";
import { USER_INFO_ROUTES } from "@/utils/constants";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const getUserInfo = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get(USER_INFO_ROUTES, {withCredentials: true});
            console.log(response.data.user);
            setUser(response.data.user);
        } catch (error) {
            console.error("Error in getting user Info");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUserInfo();
    },[])

    return (
        <UserContext.Provider value={{ user: user, loading: isLoading }} >
            {children}
        </UserContext.Provider>
    )
}


export default UserProvider;