/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import Warning from '../../../components/Warning';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [categoria, setCategoria] = useState('');
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: 'Vídeo padrão',
    url: 'https://www.youtube.com/watch?v=_eVrWa6_clA',
    categoria: 'UFC',
  });

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);

  return (
    <PageDefault>
      <Warning categoria={categoria} isWarningVisible={isWarningVisible} />
      <h1>Cadastro de Vídeo</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setCategoria(values.categoria);
          const categoriaEscolhida = categorias.find((categoria) => {
            return categoria.titulo === values.categoria;
          });
          if (categoriaEscolhida !== undefined) {
            videosRepository
              .create({
                titulo: values.titulo,
                url: values.url,
                categoriaId: categoriaEscolhida.id,
              })
              .then(() => {
                history.push('/');
              });
          } else {
            setIsWarningVisible(true);
          }
        }}
      >
        <FormField
          label="Título do vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">Cadastrar</Button>
      </form>
      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </PageDefault>
  );
}

export default CadastroVideo;
