import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GoodsStoreServiceProvider } from '../../context/goods-store-service-contex';
import GoodsStoreService from '../../services/goodsstore-service';
import store from '../../store';
import ErrorBoundry from '../error-boundry';
import Header from '../header';
import { CartPage, HomePage, CatalogPage, CatalogElementPage, NotFoundPage, LoginPage, RegisterPage } from '../pages';

import './app.css';

export default class App extends Component {
  state = {
    goodsService: new GoodsStoreService(),
    isLoggedIn: false
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem(`loggedIn`);
    if (isLoggedIn) this.onLogin();
  }

  onLogin = () => {
    this.setState({ isLoggedIn: true });
  }

  onLogout = () => {
    this.setState({ isLoggedIn: false });
    localStorage.removeItem(`loggedIn`);
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Provider store={ store }>
        <ErrorBoundry>
          <GoodsStoreServiceProvider value={ this.state.goodsService }>
            <div className="container">
              <Router>
                <Header isLoggedIn={ isLoggedIn } onLogout={ this.onLogout } />

                <Switch>
                  <Route path='/' component={ HomePage } exact />
                  <Route path='/cart' component={ CartPage } />
                  <Route path='/catalog' component={ CatalogPage } exact />
                  <Route path='/catalog/:id'
                          render={({ match }) => {
                            const { id } = match.params;
                            return <CatalogElementPage itemId={ id } />
                          }  } />
                  <Route path='/login'
                          render={() => {
                            return <LoginPage onLogin={ this.onLogin } isLoggedIn={ isLoggedIn } />
                          }} />
                  <Route path='/register'
                          render={() => {
                            return <RegisterPage onLogin={ this.onLogin } isLoggedIn={ isLoggedIn } />
                          }} />

                  <Route component={ NotFoundPage } />
                </Switch>
              </Router>

            </div>
          </GoodsStoreServiceProvider>
        </ErrorBoundry>
      </Provider>
    );
  }
};
