import { useEffect, useState } from "react";
import CatchPokemon from "./CatchPokemon";

const PokemonDetail = ({
    data
}) => {
    const pokemon = data;

    const [pokemonImage, setPokemonImage] = useState(null);
    const [pokemonImages, setPokemonImages] = useState([]);

    useEffect(() => {
        const arr = Object.keys(pokemon.sprites);
        let images = [];

        arr.map(key => {
            if(pokemon.sprites[key] !== null && typeof pokemon.sprites[key] !== 'object'){
                images.push(pokemon.sprites[key]);
            }
        });

        setPokemonImage(images.length > 0 ? images[0] : null);

        setPokemonImages(images);
    }, [pokemon]);

    return (
        <div className="mt-3">
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <img src={pokemonImage} className="w-100"/>

                    <div className="row">
                        {
                            pokemonImages.map((image, index) => (
                                <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                                    <img style={{
                                        cursor: 'pointer'
                                    }} onClick={() => setPokemonImage(image)} src={image} className="w-100 border mt-4"/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <h3>{ pokemon.name }</h3>
                    <table className="table table-striped mt-3">
                        <tbody>
                            <tr>
                                <td>Height</td>
                                <td>{ pokemon.height }</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{ pokemon.weight }</td>
                            </tr>
                        </tbody>
                    </table>

                    <CatchPokemon id={pokemon.id}/>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;