import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal';

import { loadPosts } from '../actions/posts'
import { loadCommentsForPost, displayCommentForm, hideCommentForm, commentAdded, commentUpdated } from '../actions/comments'

import PostDetail from './PostDetail'
import Comment from './Comment'
import CommentForm from './CommentForm'

import * as API from '../util/api'

class PostView extends Component { 

  componentDidMount() { 
    const { posts,match, loadCommentsForPost,loadPosts } = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    if(!posts || !posts[postId]) { 
      loadPosts()
     }

    loadCommentsForPost(postId)
   }

  constructor(props) { 
    super(props);
    this.openCommentModal = this.openCommentModal.bind(this);
    this.closeCommentModal = this.closeCommentModal.bind(this);
    ReactModal.setAppElement('#root');
   }

  openCommentModal = () => { 
    this.props.displayCommentForm()
   }

  closeCommentModal = () => { 
    this.props.hideCommentForm()
   }

  onAddComment = ({ body, author, id }) => { 
    const { commentAdded, commentUpdated, match } = this.props
    const postId = (match && match.params && match.params.postId) ? match.params.postId : null
    if (body && author && postId) { 
      if(id) { 
        API.updateComment(id, body).then((c) => { 
          commentUpdated(c)
          this.closeCommentModal()
         })
       } else { 
        API.addComment(body, author, postId).then((c) => { 
          commentAdded(c)
          this.closeCommentModal()
         })
       }
     }
   }

  render() { 
    const { posts, match, comments, commentModal } = this.props
    const postId = (match && match.params && match.params.postId)
      ? match.params.postId
      : null

    const post = posts[postId]

    const commentsForPost = Object.values(comments).filter(comment => comment.parentId === postId && !comment.deleted)

    const commentsCount = (commentsForPost && commentsForPost.length)? <span>&#40;{ commentsForPost.length }&#41;</span> : ''

    return (
      <div>
        { !post && (<div>Post doesnt exists. checkout other <Link to={ "/" }>posts</Link>.</div>) }
        { post && post.deleted && (<div>Post doesnt exists. checkout other <Link to={ "/" }>posts</Link>.</div>) }
        { post && !post.deleted && (<div><PostDetail post={ post } showReadMore={ false } showEdit={ true }/>
        <section>
          <div className="comments-section-title">Comments { commentsCount } <div className="pure-button comment-add" onClick={ this.openCommentModal }><span className="icon add"></span><span>Add Comment</span></div></div>
          { commentsForPost && commentsForPost.map((comment) => (<Comment comment={ comment } key={ comment.id }/>)) }
          <ReactModal className='Modal' overlayClassName='Overlay' isOpen={ commentModal && commentModal.isOpen } onRequestClose={ this.closeCommentModal } contentLabel='Modal'>
            { commentModal && commentModal.isOpen && <CommentForm submitBtnText={ commentModal.comment? 'Update' : 'Add' } onSubmit={ this.onAddComment } comment={ commentModal.comment } post={ post } onClose={ this.closeCommentModal }/> }
          </ReactModal>
        </section></div>) }
      </div>
    );
   }
 }

function mapStateToProps({ posts, comments, commentModal }) { 
  return { posts, comments, commentModal }
 }

export default connect(mapStateToProps, { loadPosts,loadCommentsForPost, displayCommentForm, hideCommentForm, commentAdded, commentUpdated })(PostView)
