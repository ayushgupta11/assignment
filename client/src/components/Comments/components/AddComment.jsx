import React, { useState } from 'react'
import { Input } from 'antd'

export default function AddComment({ addComment }) {
    const [comment, setComment] = useState('')
    return (
        <Input value={comment} onChange={(e) => setComment(e.target.value)} onPressEnter={() => { addComment(comment); setComment('');}} />
    )
}
