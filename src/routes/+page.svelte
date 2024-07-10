<script lang="ts">
    import Input from '$lib/components/Input.svelte';
    import { json } from '@sveltejs/kit';
    import { Button, Heading } from 'flowbite-svelte';
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    import { mapResults } from '$lib/helpers';

    let translation: string = '';
    let fact: string = 'hello world!';
    export let form: ActionData;



    const chuckHandler = async (event:any) => {
        let formData = new FormData();

        let response = await fetch('?/getChuckFact', {
            method: 'POST',
            headers: {
                //'Content-Type': 'multipart/form-data'  Apparently the boundary is automatically set is not content-type header is set
            },
            body: formData
        });

        let res = await response.json();
        console.log("res: ", res.data);
        
        let chuckFact = mapResults(res.data);
        console.log("chuck: ", chuckFact.result);
        
        fact = chuckFact.result.fact;
    }  

    const translationHandler = async (event:any) => {
        console.log(event.detail);

        let formData = new FormData();
        formData.append('message', event.detail.message);
        formData.append('lang', event.detail.lang);

        let response = await fetch('?/translate', {
            method: 'POST',
            headers: {
                //'Content-Type': 'multipart/form-data'  Apparently the boundary is automatically set is not content-type header is set
            },
            body: formData
        });

        
        let data = await response.json();
        let result = JSON.parse(data.data);
        result = mapResults(data.data);
        result = JSON.parse(result.result.body);
        translation = result.trans.message;
    }

    const helloButtonHandler = async (event:any) => {
        let formData = new FormData();

        let response = await fetch('?/hello', {
            method: 'POST',
            headers: {
                //'Content-Type': 'multipart/form-data'  Apparently the boundary is automatically set is not content-type header is set
            },
            body: formData
        });

        let hello: ActionData = await response.json();
        //console.log(hello);
        let res = hello.data;
        console.log("res: ", res);
        console.log(mapResults(res).result);
        console.log("Form: ", form);
    }

    const insultHandler = async (event:any) => {
        let formData = new FormData();

        let response = await fetch('?/getInsult', {
            method: 'POST',
            headers: {
                //'Content-Type': 'multipart/form-data'  Apparently the boundary is automatically set is not content-type header is set
            },
            body: formData
        });

        let insult = await response.json();
        console.log(insult);
        let res = mapResults(insult.data);
        console.log(res)
        fact = res.result.insult;
    }
</script>
<Heading class="mx-auto my-10 text-center">Translator thingy</Heading>

<Input 
    on:translation={translationHandler} 
    on:chuck={chuckHandler} 
    on:insult={insultHandler}
    message={fact} 
    translation={translation}/>

{#if form?.success}
    {form?.hello}
{/if}
