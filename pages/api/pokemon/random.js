// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
    let response = {
        error : null,
        data : null
    }

    //get random int between 1 and 898
    const id = Math.floor(Math.random() * 898) + 1;

    const url = process.env.POKE_API_URL + 'pokemon/' + id;

    //get pokemon
    const pokemon = await fetch(url);

    //get json
    const pokemonJson = await pokemon.json();

    //return pokemon list
    response.data = pokemonJson;

    res.statusCode = 200
    res.json(response)
}
  