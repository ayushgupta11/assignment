import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { getPosts, addNewPost } from '@actions/postsAction'
import { postAuth } from '@utils/makeRequest'
import baseUrl from '@utils/baseUrl'

import NewPost from './components/NewPost'
import Post from './components/Post'
import PostDescription from '@components/PostDescription'
import io from 'socket.io-client'
import { Skeleton, Card } from 'antd'

var socket = null

class Posts extends Component {
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
        this.props.actions.getPosts()
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
                <NewPost
                    addPost={this.addPost}
                    isLoading={this.state.isLoading}
                    user={this.props.user}
                />
                {
                    this.state.isLoading ?
                    <Card className="post-cards">
                        <Skeleton active />
                    </Card>
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
            getPosts, addNewPost
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)