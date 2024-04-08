import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const BEGIN_TOKEN = "<｜fim▁begin｜>"
const FILL_TOKEN = "<｜fim▁hole｜>"
const END_TOKEN = "<｜fim▁end｜>"

function deepseek_build_masked_func(masked_func){
    const  masked_func_ = masked_func.replace('<FILL_FUNCTION_BODY>', FILL_TOKEN)
    return BEGIN_TOKEN + masked_func_ + END_TOKEN
}

export const getBaseline = async(req, res) => {
    try {
        console.log(req.body);
        const { masked_class, language } = req.body;
        console.log(masked_class, language);
        
        const input_prompt = deepseek_build_masked_func(masked_class)
        // const input_prompt = masked_class
        // console.log(masked_class, language);
        const url = process.env.SERVER_API;
        const code = `You are using ${language} language.` 
        console.log(input_prompt)
        // res.status(201).send({
        //     message: 'Baseline code send sucessfully.',
        //     code: code,
        // })

        // console.log(url, input_prompt)

        axios.post(url, {
            model : "hinny-coder/hinny-coder-6.7b-java-awq",
            prompt: input_prompt,
            max_tokens: 400,
            temperature: 0
          })
          .then(function (response) {
            console.log(response.data.choices[0].text);
            res.status(201).send({
                "code": response.data.choices[0].text
            })
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).send(error);
          });

        // axios({
        //     method: 'post',
        //     url: url,
        //     data: {
                
        //     }
        //   })
        //     .then(function (response) {
        //         console.log(response)
        //         // res.status(201).send({
        //         //     "body": response.choices[0].text
        //         // })
        //     }).catch(function (error) {
        //         console.log(error);
        //       });


    } catch (error) {
        res.status(500).send(error);
    }
}