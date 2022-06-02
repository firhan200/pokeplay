import { useEffect, useState } from "react";
import Loading from "./Loading";

const PokemonCard = ({
    id
}) => {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function getPokemonDetail(id){
            setLoading(true);

            const res = await fetch(`/api/pokemon?id=${id}`);
            const data = await res.json();

            setPokemon(data);

            setLoading(false);
        }

        getPokemonDetail(id);
    }, [id]);

    return (
        <div>
            {
                loading ? <Loading /> : (
                    <>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} className="w-100"/>
                        <div style={{
                            fontSize: '1.2rem',
                            textTransform: 'capitalize',
                            textAlign: 'center'
                        }}>{ pokemon !== null ? pokemon.data.name : null }</div>
                    </>
                )
            }
        </div>
    );
}

export default PokemonCard;