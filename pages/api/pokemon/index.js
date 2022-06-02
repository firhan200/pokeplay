// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
    let response = {
        error : null,
        data : null
    }

    //get method
    if (req.method === 'GET') {
        //check if has param
        if (req.query.id) {
            //get pokemon by id
            const res = await fetch(`${process.env.POKE_API_URL}/pokemon/${req.query.id}`);
            const data = await res.json();

            response.data = data;
        }else{
             //get params
            const limit = req.query.limit || 898;
            const offset = req.query.offset || 0;

            const url = process.env.POKE_API_URL + 'pokemon?limit=' + limit + '&offset=' + offset;

            //get pokemon list
            const pokemonList = await fetch(url);

            //get json
            const pokemonListJson = await pokemonList.json();

            //return pokemon list
            response.data = pokemonListJson;
        }
    }

    res.statusCode = 200
    res.json(response)
}
  