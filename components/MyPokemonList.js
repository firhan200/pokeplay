import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";

const MyPokemonList = () => {
    const user = useSelector(state => state.user);

    return (
        <div>
            <h3>{ user.name }'s Pokemon</h3>
            <div className="row">
            {
                user.pokemon.map((pokemon, index) => (
                    <div className="col-sm-6 col-md-6 col-lg-3" key={index}>
                        <div className="border p-3 mb-3">
                            <PokemonCard id={pokemon}/>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
}

export default MyPokemonList;