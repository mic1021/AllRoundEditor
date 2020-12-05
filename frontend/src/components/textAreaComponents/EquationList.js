import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'react-uid';
import List from '@material-ui/core/List';

import EquationListRow from './EquationListRow';
import { selectEquation, INITCHECK } from '../../slices/EquationSlice';

function EquationList() {
  const equations = useSelector(selectEquation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(INITCHECK);
  }, [dispatch]);

  return (
    <List>
      {equations.map((equation, index) => (
        <EquationListRow
          key={uid(equation)}
          index={index}
          equation={equation}
        ></EquationListRow>
      ))}
    </List>
  );
}

export default EquationList;
