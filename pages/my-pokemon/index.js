import Layout from "../../components/Layout";
import MyPokemonList from "../../components/MyPokemonList";
import Link from 'next/link';
import UserCard from "../../components/UserCard";

const MyPokemon = () => {
    return (
        <Layout showNavbar={true} isPublic={false}>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <UserCard />
                        <div className="mt-3">
                            <Link href="/pokemons/catch"><a className="btn btn-warning w-100">Catch Pokemon</a></Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-8">
                        <MyPokemonList />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default MyPokemon;