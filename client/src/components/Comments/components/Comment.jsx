import React, { useState } from 'react'
import AddComment from './AddComment'

export default function Comment({ comment, computeTime, addComment }) {
    const [reply, showReply] = useState(false)
    return (
        <div className="comment-container">
            <div className="commented-by">
                {comment.user[0].name}
                <span className="comment-time">
                    {computeTime(comment.timestamp)}
                </span>
            </div>
            <div>{comment.content}</div>
            {
                reply ?
                    <AddComment addComment={addComment} replyTo={comment._id} />
                    : <a onClick={() => showReply(true)}>Reply</a>
            }
            {
                comment.children.map((child) => {
                    return(
                    <div className="comment-container">
                        <div className="commented-by">
                            {child.user[0].name}
                            <span className="comment-time">
                                {computeTime(child.timestamp)}
                            </span>
                        </div>
                        <div>{child.content}</div>
                    </div>)
                })
            }
        </div>
    )
}