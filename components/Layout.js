import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { init } from "../redux/user/userSlice";

const Layout = ({
    showNavbar = false,
    isPublic = true,
    children
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(init());
    }, []);


    useEffect(() => {
        console.log(isPublic);
        if(!isPublic){
            console.log(user);
            if(user.name === null){
                router.push('/');
            }
        }else{
            if(user.name !== null){
                router.push('/my-pokemon');
            }
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>Pokeplay</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
                <link href="/assets/css/style.css" rel="stylesheet"></link>
            </Head>

            {
                showNavbar ? (
                    <>
                        <nav className="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
                            <div className="container">
                                <a className="navbar-brand" href="#"><strong>Pokeplay</strong></a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                        <Link href="/my-pokemon"><a className="nav-link">My Pokemon</a></Link>
                                        <Link href="/pokemons"><a className="nav-link">Pokemon Data</a></Link>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div style={{
                            height: "60px"
                        }}></div>
                    </>
                ) : null
            }

            {children}
        </>
    );
}

export default Layout;