import React from 'react';
import css from './style.module.css';

export default function Warning({ categoria, isWarningVisible }) {
  return (
    <h3 className={`${css.title} ${isWarningVisible && css.appear}`}>
      Erro ao cadastrar vídeo: a categoria {categoria} não existente
    </h3>
  );
}
