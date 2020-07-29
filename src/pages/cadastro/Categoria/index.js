import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000',
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

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.nome}</h1>
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
          nome="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor:"
          type="color"
          nome="cor"
          value={values.cor}
          onChange={handleChange}
        />

        {/* <div>
          <label>
            Cor:
            <input
              type="color"
              value={values.cor}
              name="cor"
              onChange={handleChange}
            />
          </label>
        </div> */}
        <button>Cadastrar</button>

        <ul>
          {categorias.map((categoria, indice) => {
            return <li key={`${categoria}${indice}`}>{categoria.nome}</li>;
          })}
        </ul>
      </form>

      <Link to="/">Ir para o home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
