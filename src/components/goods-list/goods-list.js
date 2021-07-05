import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGoods, fetchGoodsThunk, goodAddToCart } from '../../actions';
import { compose } from '../../utils';
import GoodsListItem from '../goods-list-item';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import { withGoodsStoreService } from '../hoc';

const GoodsList = ({ goods, onAddToCart, onItemSelected }) => {
  return (
    <div className="row row-cols-md-4 g-4">
      { goods.map((good) => {
        return (
          <div className="col" key={ good.id }>
            <GoodsListItem
              good={ good }
              onAddToCart={ () => onAddToCart(good.id) }
              onItemSelected={ onItemSelected } />
          </div>
        )
      })}
    </div>
  )
}

class GoodsListContainer extends Component {
  componentDidMount() {
    this.props.fetchGoods();
  }

  render() {
    const { goods, loading, onItemSelected, onAddToCart, error } = this.props;

    if (loading || !goods) return <Spinner />;

    if (error) return <ErrorIndicator />;

    return (
      <GoodsList
        goods={ goods }
        onAddToCart={ onAddToCart }
        onItemSelected={ onItemSelected } />
    )
  }
}

const mapStateToProps = ({ goodsList: { goods, loading, error }}) => {
  return { goods, loading, error }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     goodsLoaded: (newGoods) => {
//       dispatch({
//         type: `GOODS_LOADED`,
//         payload: newGoods
//       })
//     }
//   }
// }

// const mapDispatchToProps = { goodsLoaded, goodsRequested, goodsError }

const mapDispatchToProps = (dispatch, ownProps) => {
  const { goodsStoreService } = ownProps;

  return bindActionCreators({
    fetchGoods: fetchGoodsThunk(goodsStoreService),
    onAddToCart: goodAddToCart
  }, dispatch);

  return {
    // fetchGoods: fetchGoods(goodsStoreService, dispatch),
    fetchGoods: () => dispatch(fetchGoodsThunk(goodsStoreService)()),
    onAddToCart: (id) => dispatch(goodAddToCart(id))
  }
}

export default
  compose(
    withGoodsStoreService(),
    connect(mapStateToProps, mapDispatchToProps)
  )(GoodsListContainer)
