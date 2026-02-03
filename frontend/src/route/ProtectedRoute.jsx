import {useContext} from 'react'
import { UserContext } from '@/context/UserContext'
import { Spinner } from "@/components/ui/spinner"
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const {user,loading} = useContext(UserContext);
    console.log("User in protected route",user);
    if(loading) {
        return <Spinner />
    }

    if(!user) {
        return <Navigate to='/auth' replace />
    }

    if(user && user.profileSetup === false) {
        return <Navigate to='/profile' replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute;