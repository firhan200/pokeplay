import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import PokemonDetail from "../../components/PokemonDetail";

const Catch = () => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //get random pokemon to appear
        async function getRandomPokemon(){
            setLoading(true);

            const res = await fetch('/api/pokemon/random');
            const data = await res.json();

            const pokemonData = data.data;

            //set pokemon
            setPokemon(pokemonData);

            setLoading(false);
        }

        getRandomPokemon();
    }, []);

    return (
        <Layout showNavbar={true} isPublic={false}>
            <div className="container">
                <div className="row">
                    {
                        loading ? <Loading /> :
                        pokemon !== null ? (
                            <>
                                <PokemonDetail data={pokemon}/>
                            </>
                        ) : (
                            <div>
                                Pokemon Not Found!
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    );
}

export default Catch;