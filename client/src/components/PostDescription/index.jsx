import React, { Component } from 'react'
import { Drawer } from 'antd'
import Post from '@components/Posts/components/Post'
import { getAuth, postAuth } from '@utils/makeRequest'
import Comments from '@components/Comments'

export default class PostDescription extends Component {
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            commentsLoading: false
        }
        props.socket.on('comment', (data) => {
            let comments = [...this.state.comments, data]
            this.setState({
                comments
            })
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.post.hasOwnProperty('_id') &&  prevProps.post._id != this.props.post._id){
            this.getComments()
        }
    }
    getComments = () => {
        this.setState({
            commentsLoading: true
        })
        getAuth(`comments/${this.props.post._id}`).then((response) => {
            this.setState({
                comments: [...response.data.data],
                commentsLoading: false
            })
        }).catch((err) => {
            this.setState({
                comments: [],
                commentsLoading: false
            })
        })
    }
    addComment = (content, replyTo) => {
        let requestData = {
            data:{
                content,
                postId: this.props.post._id
            }
        }
        if(replyTo != null){
            requestData['data']['replyTo'] = replyTo
        }
        postAuth('comments/add', requestData).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        let { post } = this.props
        return (
            <Drawer
                title={`Post by ${post.hasOwnProperty('user') ? post.user[0].name : ''}`}
                onClose={this.props.onClose}
                visible={this.props.drawerVisible}
                width={400}
                className="post-description"
            >
                {
                    post.hasOwnProperty('user') ?
                    <Post post={post} user={post.user[0]} hideActions={true} computeTime={this.props.computeTime} hideView={true} />
                    : null
                }
                {
                    !this.state.commentsLoading?
                    <Comments comments={this.state.comments} addComment={this.addComment} />:
                    null
                }
            </Drawer>
        )
    }
}