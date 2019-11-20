import React from 'react'

export default function Comment({ comment, computeTime }) {
    return (
        <div className="comment-container">
            <div className="commented-by">
                {comment.user[0].name}
                <span className="comment-time">
                    {computeTime(comment.timestamp)}
                </span>
            </div>
            <div>{ comment.content }</div>
        </div>
    )
}