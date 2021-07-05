import { setLocalStorage } from '../utils';

const updateShoppingCart = (state, action) => {
  if (state === undefined) {
    return {
      cartItems: JSON.parse(localStorage.getItem(`cartItems`)) || [],
      orderTotal: JSON.parse(localStorage.getItem(`orderTotal`)) || 0
    }
  }

  const { cartItems, orderTotal } = state.shoppingCart;
  const { goods } = state.goodsList;

  switch(action.type) {
    case `GOOD_ADD_TO_CART`:
      const goodId = action.payload;
      const good = goods.find(({ id }) => id === goodId);

      const isAlreadyAddedIdx = cartItems.findIndex(({ id }) => id === goodId);
      const findedItem = cartItems[isAlreadyAddedIdx];

      const newItem = {
        ...good,
        count: findedItem?.count + 1 || 1
      }

      let newCartItems = [...cartItems, newItem];

      if (findedItem) {
        newCartItems = [
          ...cartItems.slice(0, isAlreadyAddedIdx),
          newItem,
          ...cartItems.slice(isAlreadyAddedIdx + 1)
        ]
      }

      const addedTotal = orderTotal + good.price;

      setLocalStorage({
        'cartItems': newCartItems,
        'orderTotal': addedTotal
      });

      return {
        cartItems: newCartItems,
        orderTotal: addedTotal
      }

    case `GOOD_REMOVE_FROM_CART`:
      const goodToRemoveId = action.payload.itemId;
      const goodToRemoveIdx = cartItems.findIndex(({ id }) => id === goodToRemoveId);
      const goodToRemove = cartItems[goodToRemoveIdx];

      let newCartItemsAfterRemove;

      if (goodToRemove.count > 1 && !action.payload.isTotalDelete) {
        newCartItemsAfterRemove = [
          ...cartItems.slice(0, goodToRemoveIdx),
          {...goodToRemove, count: goodToRemove.count - 1},
          ...cartItems.slice(goodToRemoveIdx + 1),
        ];
      } else {
        newCartItemsAfterRemove = [...cartItems.filter(({ id }) => id !== goodToRemoveId)];
      }

      const removedTotal =
        newCartItemsAfterRemove.length
        ? orderTotal - goodToRemove.price * goodToRemove.count
        : 0;

      setLocalStorage({
        'cartItems': newCartItemsAfterRemove,
        'orderTotal': removedTotal
      });

      return {
        cartItems: newCartItemsAfterRemove,
        orderTotal: removedTotal
      }

    default:
      return state.shoppingCart;
  }
}

export default updateShoppingCart;
