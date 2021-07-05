import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { compose } from '../../utils';
import { withGoodsStoreService } from '../hoc';
import { goodLoaded, goodsRequested, goodsError } from '../../actions';

class CatalogElementPage extends Component{
  componentDidMount() {
    const { itemId, goodLoaded, goodsRequested, goodsStoreService, goodsError } = this.props;

    goodsRequested();
    goodsStoreService.getProduct(itemId)
      .then((res) => goodLoaded(res))
      .catch((err) => goodsError(err));
  }

  render() {
    const { good, loading, error } = this.props;

    if (loading || !good) return <Spinner />;

    if (error) return <ErrorIndicator />;

    const { description, title, image, price, id } = good;

    return(
      <div className="card card-element mb-3">
        <div className="row g-0">
          <div className="col-md-3">
            <div className="card-body">
              <img src={ image } className="img-fluid rounded-start" alt={ title } />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h5 className="card-title">{ title }</h5>
              <p className="card-text">{ description }</p>
              <div className="card-footer bg-transparent row">
                <div className="col-6 d-flex align-items-center p-0">
                  <b className="card-price">{ price }$</b>
                </div>
                <div className="col-6 d-flex justify-content-end p-0">
                  {/* eslint-disable-next-line */}
                  <a href="#" className="btn btn-primary card-btn">
                    <span>Add to Cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
                      <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ goodsList: { good, loading, error }}) => {
  return { good, loading, error }
}

const mapDispatchToProps = { goodLoaded, goodsRequested, goodsError }

export default compose(
                withGoodsStoreService(),
                connect(mapStateToProps, mapDispatchToProps)
              )(CatalogElementPage);
