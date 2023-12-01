import fetch from 'node-fetch';



export async function handler (event, context) {
	try {
		const data = JSON.parse(event.body);
		const { pageURL } = data;
		const apiKey = process.env.DEEPL_API_KEY;

		const res = await fetch(pageURL, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `DeepL-Auth-Key ${apiKey}`,
			},
		});
		const jsonContent = await res.json();

		return {
			statusCode: 200,
			body: jsonContent,
		};
	} catch (e) {
		let responseBody = "Something bad happened!";
		if (e instanceof SyntaxError) {
			responseBody = "Bad JSON!";
		} else if (e instanceof TypeError) {
			responseBody = "Bad URL!";
		}

		return {
			statusCode: 404,
			body: responseBody,
		};
	}
}
