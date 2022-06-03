import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removePokemon } from './../redux/user/userSlice';
import Loading from "./Loading";

const PokemonCard = ({
    id
}) => {
    const dispatch = useDispatch();

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

    const releasePokemon = () => {
        //show confirm
        const confirm = window.confirm("Are you sure you want to release "+pokemon.data.name+"?");
        if(confirm){
            //release pokemon
            dispatch(removePokemon(id));
        }
    }

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

                        <button type="button" onClick={() => releasePokemon()} className="btn btn-warning btn-sm w-100 mt-2">Release</button>
                    </>
                )
            }
        </div>
    );
}

export default PokemonCard;