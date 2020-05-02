import { Component } from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal');

export default class Portal extends Component {
  constructor() {
    super();
    // Create an empty div where we can place the portals content
    this.el = document.createElement('div');
  }

  componentDidMount = () => {
    //   This will create a div in the portal root
    portalRoot.appendChild(this.el);
  };

  componentWillUnmount = () => {
    //   Remove the element when the component gets unmounted
    portalRoot.removeChild(this.el);
  };

  render() {
    //   Telling ReactDOM to take the children of this component and render it into the el element (which is this case is a div)
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
