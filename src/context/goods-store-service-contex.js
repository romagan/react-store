import { createContext } from 'react';

const {
  Provider: GoodsStoreServiceProvider,
  Consumer: GoodsStoreServiceConsumer
} = createContext();

export {
  GoodsStoreServiceProvider,
  GoodsStoreServiceConsumer
}
