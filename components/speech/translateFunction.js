import { RAPIDAPI_TRANSLATE_KEY, RAPIDAPI_TRANSLATE_HOST } from "@env";

import axios from "axios";

export default function Translate(textToTranslate, from, to) {
  return new Promise((resolve, reject) => {
    const data = {
      from: from,
      to: to,
      e: "",
      q: [textToTranslate],
    };
    const options = {
      method: "POST",
      url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": `${RAPIDAPI_TRANSLATE_KEY}`,
        "X-RapidAPI-Host": `${RAPIDAPI_TRANSLATE_HOST}`,
      },
      data: JSON.stringify(data),
    };

    axios
      .request(options)
      .then(function (response) {
        /* props.setTranslation(response.data[0]); */
        resolve(response.data[0]);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
  });
}
