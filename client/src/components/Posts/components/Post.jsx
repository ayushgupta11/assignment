import React from 'react'
import { Card } from 'antd'
import PostHeader from './PostHeader'

export default function Post({ post, user, computeTime, openDrawer, hideView=false }) {
    return (
        <Card
            title={
                <PostHeader 
                    name={user.name} 
                    timestamp={computeTime(post.timestamp)}
                    viewPost={openDrawer}
                    post={post}
                    hideView={hideView}
                />
            }
            className="post-cards"
        >
            {post.content}
        </Card>
    )
}