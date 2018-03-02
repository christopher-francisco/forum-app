import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import ThreadsPage from './ThreadsPage';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className='navbar' aria-label='main navigation'>
            <div className='navbar-brand'>
              <Link className='navbar-item' to='/'>
                Forum App
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <Route exact path='/' component={ ThreadsPage } />
        </main>
      </div>
    );
  }
}

export default App;
