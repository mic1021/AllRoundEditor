import React from 'react';
import Header from './components/Header';
import EquationListContainer from './components/EquationListContainer';
import TextArea from './components/TextArea';

export default function AllRoundEditor() {
  return (
    <>
      <Header></Header>
      <EquationListContainer></EquationListContainer>
      <TextArea></TextArea>
    </>
  );
}
