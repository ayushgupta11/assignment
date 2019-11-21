import React from 'react'
import { Card, Button, Icon } from 'antd'
import PostHeader from './PostHeader'

export default function Post({ post, user, computeTime, openDrawer, hideView=false, hideActions = false }) {
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
            actions={
                !hideActions ? [
                <Button type="link" icon="like">Like</Button>,
                <Button  type="link" icon="message">Comment</Button>,
                <Button  type="link" icon="share">Share</Button>
            ]: []}
            className="post-cards"
        >
            {post.content}
        </Card>
    )
}