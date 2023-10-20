import axios from 'axios'

const createPoem = async ({ keywords, era, tone, numOfTokens }) => {
    const apiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1'
    const apiKey = import.meta.env.VITE_INFERENCE_API_KEY
    const input = { 
        inputs: `<s>[INST]Generate a poem using these parameters: Keywords should be ${keywords}. Era should be ${era}. Tone should be ${tone}[/INST]`,
        options: {
            wait_for_model: true
        },
        parameters: {
            max_new_tokens: parseInt(numOfTokens),
            return_full_text: false
        }
    }

    const config = {
        headers: { 
            Authorization: `Bearer ${apiKey}`,
        }
    }

    console.log(apiKey)

    const response = await axios.post(apiUrl, input, config)
    return response.data[0].generated_text.slice(1)
}

export default { createPoem }
