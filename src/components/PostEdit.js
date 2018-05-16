import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as posts from '../actions/posts'
import * as API from '../util/api'

import PostEditForm from './PostEditForm'



class PostEdit extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({title, body, category}) {
    const {postUpdated, match, history: {push} } = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null


    if (postId && title && body ) {
      API.editPost(postId, title, body).then((post) => {
        postUpdated(post);
        push("/" + category + "/" + postId);
      })
    }
  }

  render() {
    const { posts, match, cats } = this.props
    const postId = (match && match.params && match.params.postId) ? match.params.postId : null
    const post = posts[postId]

    return  (<PostEditForm cats={cats} submitBtnText='Update' onSubmit={this.onSubmit} post={post}/>);
  }
}

function mapStateToProps({ posts, cats }) {
  return { posts, cats }
}

export default connect(mapStateToProps, posts)(PostEdit)

