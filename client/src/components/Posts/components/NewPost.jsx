import React, { useState } from 'react'
import { Card, Input, Button } from 'antd'

export default function NewPost({ addPost, isLoading, user }) {
    const [content, setContent] = useState('')
    return (
        <Card
            className="post-cards"
            title={
                <div className="new-post-title">
                    <span>Post Something</span>
                    <Button 
                        disabled={!content.length}
                        loading={isLoading}
                        onClick={() =>{
                        addPost(content);
                        setContent('');
                        }}
                        shape="round" 
                        type="primary">
                            Post
                    </Button>
                </div>
            }
        >
            <div className="new-post-container">
                <Input.TextArea placeholder={`Hello ${user.name}, what's on your mind?`}
                    onChange={(e) => { setContent(e.target.value) }}
                    value={content}
                />
            </div>
        </Card>
    )
}