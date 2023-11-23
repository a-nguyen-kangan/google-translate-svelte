import type { Actions } from "@sveltejs/kit";
import { X_RAPIDAPI_KEY } from '$env/static/private';
import type { ActionData } from './$types';

let api_key = X_RAPIDAPI_KEY;
let x_host = 'google-translate1.p.rapidapi.com';
let chuck_host = 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com';
let translate2_host = 'google-translate113.p.rapidapi.com';
let insult_url = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';

export const actions: Actions = {
    hello: () => {
        console.log(api_key);
        return <ActionData> {
            success: true,
            hello: api_key,
  
        } 
    },

    translate: async ({cookies, request}) => {
        let data = await request.formData();
        //console.log("data: ", data);
        let message = data.get('message')?.toString();
        let lang = data.get('lang')?.toString();
        //console.log("entries ", data.values().next().value);
        //console.log("data: ", message, lang);
        if(message && lang) {
            let response = await translate2(message, lang, 'en');
            //console.log("response: ", response);
            return {
                body: response
            }
        }
    },

    getChuckFact: async () => {
        let data = await getChuckFact();
        console.log("data: ", data);
        return data;
    },

    getInsult: async () => {
        let data = await getInsult();
        console.log("data: ", data);
        return data;
    }
} satisfies Actions;

const getInsult = async () => {
    const response = await fetch(insult_url);

    if (response.ok) {
        return await response.json();
    } else {
        return "Error: Unable to get insult";
    }
}

const translate = async (message: string, lang: string, origLang:string):Promise<string> => {
    let url = `https://google-translate1.p.rapidapi.com/language/translate/v2`;
    let body = new URLSearchParams();
    body.append('q', message);
    body.append('target', lang);
    body.append('source', origLang);

    let options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': x_host
        },
        body: body
    };

    let response = await fetch(url, options);
    let data = await response.text();
    //console.log("data: ", data);
    return data;
}

const getChuckFact = async ():Promise<any> => {
    const url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': chuck_host
        }
    };

    try {
        const response = await fetch(url, options);
        //const result = await response.text();
        const resultJson = await response.json();
        //console.log("Chuck Fact Text: ", result);
        console.log("Chuck Fact Json: ", resultJson);
        let chuckFact = { chuckFact : resultJson.value};
        return { fact: resultJson.value };
    } catch (error) {
        console.error(error);
        return "Error: Unable to get Chuck Fact";
    }
}

const translate2 = async (message: string, lang: string, origLang:string) => {
    const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/json';

    const json = { message: message };

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': translate2_host
        },
        body: new URLSearchParams({
            from: origLang,
            to: lang,
            json: JSON.stringify(json)
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();

        return result;
    } catch (error) {
        console.error(error);
        
    }
}