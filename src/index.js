import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Route, BrowserRouter, Link} from 'react-router-dom'



import App from './components/App';
import rootReducer from './reducers/root_reducer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Posts from './components/Posts';
import PostEdit from './components/PostEdit';
import PostView from './components/PostView';
import PostAdd from './components/PostAdd'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);


ReactDOM.render(
    <Provider store={store}>
    	<BrowserRouter>
        	<div className="content">
                <Link to="/postadd"><button className="header_right_center fab_btn">Create a New Post</button></Link>
                <Route exact path="/" component={App}/>
                <Route exact path="/:category" component={Posts}/>
                <Route exact path="/postadd" component={PostAdd}/>
                <Route exact path="/:category/:postId" component={PostView}/>
                <Route exact path="/:category/:postId/edit" component={PostEdit}/>
	        </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

registerServiceWorker();