import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

import useHttpErrorHandler from '../../hooks/http-error-handler';
const withErrorHandler = (WrappedCompoent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
        <Aux>
        <Modal 
          show={error}
          modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
      <WrappedCompoent {...props} />
      </Aux>
      );
  }
}

export default withErrorHandler;