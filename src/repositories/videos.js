/* eslint-disable linebreak-style */
import configs from '../config';

const URL_CATEGORIES = `${configs.URL_BACKEND}/videos`;

function create(objetoDoVideo) {
  return fetch(`${URL_CATEGORIES}?_embed=videos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(objetoDoVideo),
  })
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }

      throw new Error('Não foi possível cadastradar os dados')
    });
}

export default {
  create,
};
