import { useEffect, useCallback, useState, memo } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

const Pokemons = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [masterPokemons, setMasterPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const perPage = 30;

    const myPokemon = useSelector(state => state.user.pokemon);

    useEffect(() => {
        async function getPokemons(){
            setLoading(true);

            const res = await fetch('/api/pokemon');
            const data = await res.json();

            const pokemonDataList = data.data.results.map((pokemon, index) => {
                pokemon.id = index + 1;
                return pokemon;
            })
            
            setMasterPokemons(pokemonDataList);

            setPage(1);

            setLoading(false);
        }

        getPokemons();
    }, []);

    useEffect(() => {
        console.log("search")
        function populatePokemonList(page){
            const start = (page - 1) * perPage;
            const end = page * perPage;
    
            let newList = [];

            //check if search
            let filteredList = masterPokemons;
            if(keyword){
                filteredList = filteredList.filter(pokemon => {
                    return pokemon.name.toLowerCase().includes(keyword.toLowerCase());
                });
            }

            if(isLoadMore){
                newList = [...pokemonList, ...filteredList.slice(start, end)];
            }else{
                newList = filteredList.slice(start, end);
            }

            
    
            setPokemonList(newList);
        }

        populatePokemonList(page);
    }, [page, keyword]);

    const search = () => {
        setIsLoadMore(false);
        setPage(1);
        setKeyword(keyword);
    }

    useEffect(() => {
        console.log(keyword);
        if(keyword){
            search();
        }
    }, [keyword])

    const loadMore = () => {
        setIsLoadMore(true);
        setPage(page + 1);
    };

    const PerPokemon = ({
        pokemon
    }) => {
        let opacity = 0.2;

        if(myPokemon.includes(pokemon.id)){
            opacity = 1;
        }
        
        return (
            <div className="col-6 col-md-3 col-lg-2">
                <div className="border p-3 mt-3" style={{
                    cursor: 'pointer',
                    opacity: opacity
                }}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} className="w-100"/>
                    <div style={{
                        fontSize: '1.2rem',
                        textTransform: 'capitalize',
                        textAlign: 'center'
                    }}>{ pokemon.name }</div>
                </div>
            </div>
        );
    }

    return (
        <Layout showNavbar={true} isPublic={false}>
            {
                loading ? <div className="text-center mt-3"><Loading /></div> : (
                    <div className="container">
                        <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search Pokemon" className="form-control mt-3 mb-3"/>
                        {
                            pokemonList !== null ?
                                <div className="row mb-5">
                                    {
                                        pokemonList.map((pokemon, index) => (
                                            <PerPokemon key={index} pokemon={pokemon}/>
                                        ))
                                    }

                                    <button type="button" onClick={() => loadMore()} className="btn btn-warning mt-4">Load More</button>
                                </div>
                            : null
                        }
                    </div>
                )
            }
        </Layout>
    );
}

export default Pokemons;