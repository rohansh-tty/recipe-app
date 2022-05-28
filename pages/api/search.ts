import axios from 'axios';
export default async function handler(req: any, res: any) {
    console.log('request', req)
	const options = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
		params: {
			query: req.query.keyword,
			diet: req.query.diet,
			excludeIngredients: req.query.exclude,
			number: '20',
			offset: '0'
		},
		headers: {
			'x-rapidapi-host':
				'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
			'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
		}
	};
	try {
		let response = await axios(options);
		res.status(200).json(response.data);
	} catch (error: any) {
		console.error(error.response);
	}
}