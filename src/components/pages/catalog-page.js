import React, { Component } from 'react';
import { withRouter } from 'react-router';

import GoodsList from '../goods-list';

class CatalogPage extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <h1 className="text-center mb-5">Catalog</h1>
        <GoodsList onItemSelected={ (id) => history.push(id) } />
      </div>
    )
  }
}

export default withRouter(CatalogPage);
