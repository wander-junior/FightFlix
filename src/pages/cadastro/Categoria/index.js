/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import config from '../../../config';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };
  const [categorias, setCategorias] = useState([]);

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const URL = `${config.URL_BACKEND}/categorias`;
  useEffect(() => {
    const URL = `${config.URL_BACKEND}/categorias`;
    fetch(URL).then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      setCategorias([...resposta]);
    });
  }, [values.titulo]);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.titulo}
      </h1>
      <form
        onSubmit={function handleSubmit(e) {
          e.preventDefault();
          fetch(URL, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          clearForm();
        }}
      >
        <FormField
          label="titulo da categoria:"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição:"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor:"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>Cadastrar</Button>

        {categorias.length === 0 && <div>Loading...</div>}

        <ul>
          {categorias.map((categoria) => (
            <li key={`${categoria.titulo}`}>{categoria.titulo}</li>
          ))}
        </ul>
      </form>

      <Link to="/">Ir para o home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
