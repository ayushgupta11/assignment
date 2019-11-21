import React, { useState } from 'react'
import { Input } from 'antd'

export default function AddComment({ addComment, replyTo = null }) {
    const [comment, setComment] = useState('')
    return (
        <Input 
            placeholder={"Write Here"} 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            onPressEnter={() => { addComment(comment, replyTo); setComment('');}} 
        />
    )
}