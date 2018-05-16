import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as comments from '../actions/comments'


class Comment extends Component {
  render() {
    const { comment } = this.props
    return (
      <section className="comment" key={comment.id}>
        <header className="comment-header">
            <p className="comment-meta"><span className="comment-author">{comment.author}</span> on {printDate(comment.timestamp)}</p>
        </header>
        <div className="comment-description">{comment.body}</div>
        <div className="comment-actions">
          <span className="upvote" onClick={() => this.props.voteComment(comment.id, 'upVote')}>Upvote</span>
          <span className="comment-count">{comment.voteScore}</span>
          <span className="downvote" onClick={() => this.props.voteComment(comment.id, 'downVote')}>Downvote</span>
          <span className="comment-delete" onClick={() => this.props.deleteComment(comment.id)}>Delete</span>
          <span className="comment-edit"  onClick={() => this.props.displayCommentForm(comment)}>Edit</span>
        </div>
      </section>
    );
  }
}

function printDate(timestamp) {
  const d = new Date(timestamp)
  return d.toUTCString().split(" ").slice(0,4).join(" ")
}

function mapStateToProps({ comments }) {
  return { comments }
}

export default connect(mapStateToProps, comments)(Comment)
