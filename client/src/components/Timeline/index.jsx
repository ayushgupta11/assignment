import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { getTimelinePosts, addNewPost } from '@actions/postsAction'
import { postAuth } from '@utils/makeRequest'
import baseUrl from '@utils/baseUrl'

import NewPost from '@components/Posts/components/NewPost'
import Post from '@components/Posts/components/Post'
import PostDescription from '@components/PostDescription'
import io from 'socket.io-client'
import { Skeleton, Card } from 'antd'

var socket = null

class Timeline extends Component {
    constructor(){
        super()
        this.state = {
            isLoading: false,
            drawerVisible: false,
            activePost: {}
        }
        socket = io.connect(baseUrl)
        socket.on('post', (data) => {
            this.props.actions.addNewPost(data)
        })
    }
    componentDidMount(){
        this.props.actions.getTimelinePosts(this.props.user._id)
    }
    componentWillUnmount(){
        socket.disconnect()
    }
    computeTime = (date) => {
        return moment(date).fromNow()
    }
    addPost = (content) => {
        this.toggleLoading()
        postAuth('posts/add', {
            data:{
                content
            }
        }).then((response) => {
            this.toggleLoading()
            console.log(response)
        }).catch((error) => {
            this.toggleLoading()
            console.log(error)
        })
    }
    toggleLoading = () => {
        this.setState({
            isLoading: !this.state.isLoading
        })
    }
    closeDrawer = () => {
        this.setState({
            drawerVisible: false
        })
    }
    openDrawer = (post) => {
        this.setState({
            drawerVisible: true,
            activePost: {...post}
        })
    }
    render() {
        let sortedPosts = [...this.props.posts].sort((a, b) => {
            return b.timestamp - a.timestamp
        })
        return (
            <div className="posts-container">
                <PostDescription 
                    onClose={this.closeDrawer}
                    drawerVisible={this.state.drawerVisible}
                    post={this.state.activePost}
                    computeTime={this.computeTime}
                    socket={socket}
                />
                {
                    this.state.isLoading ?
                    <Card className="post-cards">
                        <Skeleton active />
                    </Card>
                    : null
                }
                {
                    !sortedPosts.length ?
                    <h1>You have not posted anything yet! Write your first post on Home.</h1>
                    : null
                }
                {
                    sortedPosts.map((post) => {
                        return(
                            <Post 
                                post={post}
                                user={post.user[0]} 
                                key={post._id}
                                computeTime={this.computeTime}
                                openDrawer={this.openDrawer}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        posts: state.posts,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        actions: bindActionCreators({
            getTimelinePosts, addNewPost
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)