import React, { Component } from 'react'
import * as posts from '../actions/posts'
import * as API from '../util/api'
import { connect } from 'react-redux'
import PostEditForm from './PostEditForm'

class PostAdd extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({title, body, author, category}) {
    const { postAdded, history: { push } } = this.props

    if (title && body && author && category) {
      API.addPost(title, body, author, category).then((post) => {
        postAdded(post)
        push("/")
      })
    }
  }
  render() {
    const { cats } = this.props
    return (
      <div>
        <PostEditForm cats={ cats } submitBtnText='Add' onSubmit={ this.onSubmit }/>
      </div>
    );
  }
}

function mapStateToProps({ cats }) {
  return { cats }
}

export default connect(mapStateToProps, posts)(PostAdd)
