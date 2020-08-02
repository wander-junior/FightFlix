/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValue(name, value);
  }

  useEffect(() => {
    const URL = 'http://localhost:8080/categorias';
    fetch(URL).then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      setCategorias([...resposta]);
    });
  }, [values.nome]);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>
      <form
        onSubmit={function handleSubmit(e) {
          e.preventDefault();
          setCategorias([...categorias, values]);
          setValues({ valoresIniciais });
        }}
      >
        <FormField
          label="Nome da categoria:"
          type="text"
          name="nome"
          value={values.nome}
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

        {categorias.length === 0 && (
          <div>
            Loading...
          </div>
        )}

        <ul>
          {categorias.map((categoria) => <li key={`${categoria.nome}`}>{categoria.nome}</li>)}
        </ul>
      </form>

      <Link to="/">Ir para o home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
