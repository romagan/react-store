const updateGoodsList = (state, action) => {
  if (state === undefined) {
    return {
      good: {},
      goods: [],
      loading: true,
      error: null,
    }
  }

  switch(action.type) {
    case 'FETCH_GOODS_REQUEST':
      return {
        good: {},
        goods: [],
        loading: true,
        error: null
      }

    case 'FETCH_GOODS_SUCCESS':
      return {
        good: state.good,
        goods: action.payload,
        loading: false,
        error: null
      }

    case 'FETCH_GOOD_SUCCESS':
      return {
        goods: state.goods,
        good: action.payload,
        loading: false,
        error: null
      }

    case `FETCH_GOODS_FAILURE`:
      return {
        goods: [],
        good: [],
        loading: false,
        error: action.payload
      }

    default:
      return state.goodsList;
  }
}

export default updateGoodsList;
