const goodsLoaded = (newGoods) => {
  return {
    type: `FETCH_GOODS_SUCCESS`,
    payload: newGoods
  }
}

const goodLoaded = (newGood) => {
  return {
    type: `FETCH_GOOD_SUCCESS`,
    payload: newGood
  }
}

const goodsRequested = () => {
  return {
    type: `FETCH_GOODS_REQUEST`
  }
}

const goodsError = (error) => {
  return {
    type: `FETCH_GOODS_FAILURE`,
    payload: error
  }
}

//Используем двойной вызов для того, чтобы в компоненте вызывать функцию без аргументов
const fetchGoods = (goodsStoreService, dispatch) => () => {
  dispatch(goodsRequested());
  goodsStoreService.getProducts()
    .then((res) => dispatch(goodsLoaded(res)))
    .catch((err) => dispatch(goodsError(err)));
}

const fetchGoodsThunk = (goodsStoreService) => () => (dispatch) => {
  dispatch(goodsRequested());
  goodsStoreService.getProducts()
    .then((res) => dispatch(goodsLoaded(res)))
    .catch((err) => dispatch(goodsError(err)));
}

const goodAddToCart = (itemId) => {
  return {
    type: `GOOD_ADD_TO_CART`,
    payload: itemId
  }
}

const goodRemoveFromCart = (itemId, isTotalDelete = false) => {
  return {
    type: `GOOD_REMOVE_FROM_CART`,
    payload: {
      itemId,
      isTotalDelete
    }
  }
}

export {
  goodsLoaded,
  goodLoaded,
  goodsRequested,
  goodsError,
  fetchGoods,
  fetchGoodsThunk,
  goodAddToCart,
  goodRemoveFromCart
}
