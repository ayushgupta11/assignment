import React from 'react'
import { Avatar, Button } from 'antd'

export default function PostHeader({ name, timestamp, viewPost, post, hideView }) {
    return (
        <div className="post-header">
            <div className="post-header-left">
                <div>
                    <Avatar icon="user" />
                </div>
                <div className="post-details">
                    <div>{name}</div>
                    <div className="post-time">{ timestamp }</div>
                </div>
            </div>
            <div>
            {
                !hideView ?
                <Button type="link" block onClick={() => viewPost(post)}>
                    View Post
                </Button> : null
            }
            </div>
        </div>
    )
}