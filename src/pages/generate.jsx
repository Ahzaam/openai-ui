import axios from "axios";

export default function getCaption(){
    axios.post('https://openai-fiver.vercel.app/', {
        keywords: 'ahzam, pilot'
    }).then((response) => {
        console.log(response);
    })

}