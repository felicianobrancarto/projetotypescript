import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export const Pages = () => {

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}