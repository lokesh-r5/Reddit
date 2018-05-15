import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

import {votePost, deletePost} from '../actions/posts'

class PostDetail extends Component {

  render() {
    const {post, votePost, deletePost} = this.props

    return (
      <div>
        {post && 
        (<div className="post">
          <header className="post-header">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-meta">
                  By <span className="post-author">{post.author}</span> 
                  <Link to={`${post.category}`} className="post-category">{post.category}</Link>
                  <span className="post-data">{printDate(post.timestamp)}</span>
              </p>
          </header>
          <div className="post-description">
              <p>{post.body}</p>
          </div>
          <div>
            <span>{post.commentCount} Comments</span>
            <span className="btn" id="upvote" onClick={() => votePost(post.id, "upVote")}>Upvote</span>
            <span>{post.voteScore}</span>
            <span className="btn" id="downvote" onClick={() => votePost(post.id, "downVote")}>Downvote</span>
            <span className="btn"><Link to={`/${post.category}/${post.id}/edit`}>Edit</Link></span>
            <span className="btn" id="delete" onClick={() => deletePost(post.id)}>Delete</span>
          </div>
        </div>)}
      </div>
    );
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

function printDate(timestamp) {
  const date = new Date(timestamp)
  return date.toUTCString().split(" ").slice(0,4).join(" ")
}

export default connect(mapStateToProps, {votePost, deletePost})(PostDetail)
