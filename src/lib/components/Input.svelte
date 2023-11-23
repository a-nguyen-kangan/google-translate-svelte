<script lang="ts">
    import { Textarea, Label, Button, Select } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let message: string = 'hello';
    export let translation: string;
    let lang: string = 'es';

    let languages = [
        { value: 'en', name: 'English' },
        { value: 'es', name: 'Spanish' },
        { value: 'fa', name: 'Persian' },
        { value: 'fr', name: 'French' },
        { value: 'de', name: 'German' },
        { value: 'it', name: 'Italian' },
        { value: 'ja', name: 'Japanese' },
        { value: 'ko', name: 'Korean' },
        { value: 'pt', name: 'Portuguese' },
        { value: 'ru', name: 'Russian' },
        { value: 'zh', name: 'Chinese' },
        { value: 'vi', name: 'Vietnamese'}
    ];

    const translateButtonClickHandler = async (event: any) => {
        dispatch('translation', {
            message: message,
            lang: lang
        });
    }

    const getChuckButtonClickHandler = async (event: any) => {
        dispatch('chuck', {
        });
    }

    const getInsultButtonClickHandler = async (event: any) => {
        dispatch('insult');
    }
</script>

<div class="grid grid-cols-2 gap-5">

    <div class="mb-2 ml-5">
        <Label for="message-id" >Your message</Label>
        <Textarea id="message-id" placeholder="Your message" rows="4" name="message-id" bind:value={message}/>
    </div>
    <div class="mb-2 mr-5">
        <Label for="translation-id" >Translation</Label>
        <Textarea id="translation-id" placeholder="Translation" rows="4" name="translation-id" bind:value={translation}/>
    </div>
</div>
<div class="border">
    <div class="float-root mx-auto">
        <div class="w-6/12  float-left">
            <Button class="my-5 ml-5 float-left" on:click={getChuckButtonClickHandler}>Get Chuck Fact</Button>
            <Button class="my-5 ml-5 float-left" on:click={getInsultButtonClickHandler}>Get Insult</Button>
        </div>

        <div class="w-6/12  float-right">
            <Button class="my-5 mr-5 float-right" on:click={translateButtonClickHandler}>Translate</Button>
            <Select class="my-5 mr-5 float-right max-w-fit" items={languages} bind:value={lang} />
        </div>
    </div>
</div>