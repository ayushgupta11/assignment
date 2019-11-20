import React, { Component } from 'react'
import AddComment from './components/AddComment'
import Comment from './components/Comment'
import moment from 'moment'

export default class Comments extends Component {
    computeTime = (date) => {
        return moment(date).fromNow()
    }
    render() {
        return (
            <div>
                <AddComment addComment={this.props.addComment} />
                {
                    this.props.comments.length ?
                    this.props.comments.map((comment) => {
                        return (
                            <Comment computeTime={this.computeTime} comment={comment} key={comment._id} />
                        )
                    })
                    :
                    <p>Be the first one to comment.</p>
                }
            </div>
        )
    }
}
