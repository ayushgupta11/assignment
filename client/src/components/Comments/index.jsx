import React, { Component } from 'react'
import AddComment from './components/AddComment'
import Comment from './components/Comment'
import moment from 'moment'

export default class Comments extends Component {
    computeTime = (date) => {
        return moment(date).fromNow()
    }
    render() {
        let groupedComments = [...this.props.comments]
        let groupedCommentsObj = {}
        groupedComments.forEach((comment) => {
            comment['children'] = []
            groupedCommentsObj[comment._id] = comment
        })
        Object.values(groupedCommentsObj).forEach((comment) => {
            if(comment.replyTo != null){
                groupedCommentsObj[comment.replyTo].children.push(comment)
                delete groupedCommentsObj[comment._id]
            }
        })
        return (
            <div>
                <AddComment addComment={this.props.addComment} />
                {
                    this.props.comments.length ?
                    Object.values(groupedCommentsObj).map((comment) => {
                        return (
                            <Comment
                                computeTime={this.computeTime} 
                                comment={comment} 
                                key={comment._id}
                                addComment={this.props.addComment}
                            />
                        )
                    })
                    :
                    <p>Be the first one to comment.</p>
                }
            </div>
        )
    }
}
