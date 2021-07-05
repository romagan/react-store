import React from 'react';

import './goods-list-item.css';

const GoodsListItem = ({ onItemSelected, good, onAddToCart }) => {
  const { description, title, image, price, id } = good;

  return (
    <div className="card bg-light mb-3">
      <div className="card-body">
        {/* eslint-disable-next-line */}
        <a href="#">
          <img className="card-img-top mb-3" src={ image } alt={ title } />
        </a>
        {/* eslint-disable-next-line */}
        <a href="#" onClick={ (e) => {
          e.preventDefault();
          onItemSelected(id.toString());
        } }>
          <h4 className="card-title">{ title }</h4>
        </a>
        <p className="card-text">{ description }</p>
      </div>
      <div className="card-footer bg-transparent row">
        <div className="col-6 d-flex align-items-center">
          <b className="card-price">{ price }$</b>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button
            className="btn btn-primary card-btn"
            onClick={ onAddToCart }>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoodsListItem;
