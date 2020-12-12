import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
const withErrorHandler = (WrappedCompoent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }
    errorConfirmHandler = () => {
      this.setState({error: null});
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    render () {
      return (
        <Aux>
        <Modal 
          show={this.state.error}
          modalClosed={this.errorConfirmHandler}>
          {this.state.error ? this.state.error.message : null}
        </Modal>
      <WrappedCompoent {...this.props} />
      </Aux>
      )
    }
  } 
}

export default withErrorHandler;