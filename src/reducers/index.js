

import updateGoodsList from './goods-list';
import updateShoppingCart from './shopping-cart';

const reducer = (state, action) => {
  return {
    goodsList: updateGoodsList(state, action),
    shoppingCart: updateShoppingCart(state, action)
  }
}

export default reducer;
