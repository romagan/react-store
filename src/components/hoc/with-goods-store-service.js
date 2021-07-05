import React from 'react';
import { GoodsStoreServiceConsumer } from '../../context'

const withGoodsStoreService = () => (Wrapped) => {
  return (props) => {
    return (
      <GoodsStoreServiceConsumer>
      { (goodsStoreService) => {
        return <Wrapped { ...props } goodsStoreService={ goodsStoreService } />
      }}
      </GoodsStoreServiceConsumer>
    )
  }
}

export default withGoodsStoreService;
