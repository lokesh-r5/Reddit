import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom'

import {loadPosts, sortPosts} from '../actions/posts'

import PostDetail from './PostDetail'


class Posts extends Component {

  componentDidMount() {
    const {loadPosts, posts} = this.props

    if (!posts || !posts.length) {
      loadPosts()
    }
  }
  render() {
    const {posts, match, sortPostsBy} = this.props
    const activePosts = Object.values(posts).filter(post => !post.deleted);
    const sortingParameter = sortPostsBy || "Date"
    
    const category = (match && match.params && match.params.category) ? match.params.category : null
    const catPosts = Object.values(activePosts).filter(post => (!category || (category && post.category === category)));
    const sortedPosts = catPosts.sort(function(a, b) {
      if (sortingParameter === 'Date') {
        return b.timestamp - a.timestamp
      } else {
        return b.voteScore - a.voteScore
      }
    })
    
    return (
      <ul className="posts">
      	<select className="sort-parameters" value={sortingParameter} onChange={(event) => this.props.sortPosts(event.target.value)}>
          <option key="Date">Date</option>
          <option key="Votes">Votes</option>
        </select>
    		{sortedPosts && Object.keys(sortedPosts).map((postId) => (
    			<li key={postId}>
    				<PostDetail post={sortedPosts[postId]} key={postId}/>
            <Link to={`${sortedPosts[postId].category}/${sortedPosts[postId].id}`}>Post Details</Link>
    			</li>
    		))}
      </ul>
    );
  }
}

function mapStateToProps({loadPosts, posts, sortPostsBy}) {
  return {loadPosts, posts, sortPostsBy}
}

export default connect(mapStateToProps, {loadPosts, sortPosts})(Posts)
