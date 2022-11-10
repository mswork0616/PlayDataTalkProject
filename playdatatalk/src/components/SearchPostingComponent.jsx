import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import { useParams } from "react-router-dom";
import {HeartOutlined, HeartFilled} from '@ant-design/icons';

export default ({ userObj }) => {
    const searchKeyword = useParams();
    class ListPostComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {

                boards: [],
                userId: userObj.userId,
                length: ''
            }

            this.createPost = this.createPost.bind(this);
            this.deletePost = this.deletePost.bind(this);
        }

        componentDidMount() {
            BoardService.searchkeyword(searchKeyword.keyword).then((res) => {
                console.log(res.data);
                this.setState({ boards: res.data.reverse() });
                this.setState({ length: res.data.length});
            });
        }

        ilikeCount(board) {
            const bucket = this.state.boards;
            const indexNo = bucket.indexOf(board);
            const ilike = {
                post: board,
                userId: this.state.userId
            }
            BoardService.ilike(ilike).then((res) => {
                bucket[indexNo].likeCount = res.data;
                this.setState({ boards: bucket });
            })

        }

        deletePost(board) {
            if (this.state.userId == board.userId.userId) {
                const bucket = this.state.boards;
                const indexNo = bucket.indexOf(board);
                const postId = board.postId;
                BoardService.deletePost(postId).then((res) => {
                    delete bucket[indexNo];
                    this.setState({ boards: bucket });
                })
            }
            else{
                alert("삭제할 수 없습니다.");
            }
        }

        createPost() {
            // this.props.history.push('/create-post/_create');
            window.location.replace('/create-post/_create');
        }

        updatePost(postId) {
            window.location.replace(`/create-post/${postId}`);
        }

        getUpdateandDelete(userId, board) {
            if (userId == this.state.userId) {
                return <div className='replyButton'>
                    <span onClick={() => this.updatePost(board.postId)}>수정</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span onClick={() => this.deletePost(board)}>삭제</span>
                </div>
            }
        }

        // # 3.
        render() {
            return (
                <div>
                    <div style={{ paddingTop: "20px" }}>
                        <button className="createButton" onClick={this.createPost}> 글쓰기</button>
                    </div>
                    <div className="row">
                        {
                            this.state.length === 0 ? <div>검색 결과가 없습니다.</div> :
                            this.state.boards.map(
                                board =>
                                    <div className='feed' key={board.postId} style={{ marginTop: "20px" }}>
                                        <div style={{ marginLeft: "50px" }}>
                                            <img className='profileBox' src={`${process.env.PUBLIC_URL}/`+board.userId.imgUrl} alt='imgs' />
                                            <br />
                                            <div className='App'>
                                                {board.userId.name}
                                            </div>
                                            {this.getUpdateandDelete(board.userId.userId, board)}
                                        </div>
                                        <div className='letterBox'>
                                            <div>{board.text}</div>
                                            <div className='keywordTest'>
                                                <div>{board.keyword}</div>
                                                <div style={{ marginLeft: "auto" }}>{board.createDate.replace("T", " ").slice(0,19)}</div>
                                            </div>
                                        </div>
                                        <div>{board.userId.name === '' ? <HeartFilled className='Likebutton red' onClick={() => this.ilikeCount(board)} /> : <HeartOutlined className='Likebutton' onClick={() => this.ilikeCount(board)} />}{board.likeCount}</div>
                                    </div>
                            )
                        }
                    </div>
                    <div style={{ height: "70px" }}></div>
                </div>
            );
        }
    }

    return <ListPostComponent className="rend"></ListPostComponent>;
}
