import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom'

import {loadCats} from '../actions/cats'



class Cats extends Component {

	componentDidMount() {
		const {loadCats} = this.props
		loadCats()
	}
  render() {
    const {cats} = this.props
    
    return (
        <div className="categories">
	        <nav className="nav">
				<ul className="nav-list">
					{cats && cats.map((category) => (
						<li className="nav-item" key={category.path}>
							<Link to={`${category.path}`} className="pure-button">
								<b>{category.name}</b>
							</Link>
						</li>
					))}
				</ul>
	        </nav>
	    </div>
    );
  }
}

function mapStateToProps({cats}) {
  return {cats}
}

export default connect(mapStateToProps, {loadCats})(Cats)
