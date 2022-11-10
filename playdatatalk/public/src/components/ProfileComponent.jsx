import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import { BiLike } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

export default ({ userObj }) => {

    const stat = useParams();

    class ProfileComponent extends Component {
        constructor(props) {
            super(props)

            this.state = {
                boards: [],
                user: userObj,
                name: "",
                userId: "",
                img: "",
                userInfo:{}
            }

            this.changeNameHandler = this.changeNameHandler.bind(this);
            this.updateUser = this.updateUser.bind(this);

        }

        componentDidMount() {
            BoardService.goProfile(this.state.user.userId).then((res) => {
                this.setState({ boards: res.data.postList.reverse() });
                this.setState({ name: res.data.user.name });
                this.setState({ userId: res.data.user.userId });
                this.setState({ img: res.data.user.imgUrl });
                this.setState({ userInfo: res.data.user });
                console.log(res.data.user);
            });
        }

        changeNameHandler = (event) => {
            this.setState({ name: event.target.value })
        }

        profileEdit() {
            window.location.replace("edit")
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

        updateUser = (event) => {
            event.preventDefault();
            this.state.userInfo.name = this.state.name;
            BoardService.updateUser(this.state.userInfo).then(res => {
                console.log('계정이름 수정')
                window.location.replace('_profile');
            });
        }

        deletePost(board) {
            const bucket = this.state.boards;
            const indexNo = bucket.indexOf(board);
            const postId = board.postId;
            BoardService.deletePost(postId).then((res) => {
                delete bucket[indexNo];
                this.setState({ boards: bucket });
            })
        }

        updatePost(postId) {
            window.location.replace(`/create-post/${postId}`);
        }

        render() {
            return (
                <div>

                    <div style={{ paddingTop: "5%" }} />
                    {stat.stat === '_profile' ?
                        <div className='profileMainForm'>
                            <img className='profileBoxImg' src={"../" + this.state.img} alt='imgs' />
                            <div className='profileContent'>
                                <div>닉네임 : {this.state.name}&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className='profileButton' onClick={() => this.profileEdit()}>닉네임 수정</button></div>
                                <div>이메일 : {this.state.userId}</div>
                            </div>
                        </div>
                        :
                        <div className='profileMainForm'>
                            <img className='profileBoxImg' src={"../" + this.state.img} alt='imgs' />
                            <div className='profileContent'>
                                <div>닉네임 : <input name="name" value={this.state.name} onChange={this.changeNameHandler} />
                                    <button className='profileButton' onClick={this.updateUser}>저장</button></div>
                                <div>이메일 : {this.state.userId}</div>
                            </div>
                        </div>
                    }
                    <hr></hr>
                    <div className='profileFeedForm'>
                        <div className="row">
                            {
                                this.state.boards.map(
                                    board =>
                                        <div className='feed' key={board.postId} style={{ marginTop: "20px" }}>
                                            <div style={{ marginLeft: "50px" }}>
                                                <img className='profileBox' src={"../" + board.userId.imgUrl} alt='imgs' />
                                                <br />
                                                <div className='App'>
                                                    {board.userId.name}
                                                </div>
                                                <div className='replyButton'>
                                                <span onClick={() => this.updatePost(board.postId)}>수정</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span onClick={() => this.deletePost(board)}>삭제</span>
                                            </div>
                                            </div>
                                            <div className='letterBox'>
                                                <div>{board.text}</div>
                                                <div style={{ marginLeft: "auto" }}>{board.createDate}</div></div>
                                            <div>{board.userId.name === '박나래' ? <BiLike style={{ cursor: "pointer" }} size={50} color="red" onClick={() => this.ilikeCount(board)} /> : <BiLike style={{ cursor: "pointer" }} size={50} color="blue" onClick={() => this.ilikeCount(board)} />}{board.likeCount}</div>
                                        </div>
                                )
                            }
                        </div>
                    </div>
                    <hr />

                </div>
            );
        }
    }
    return <ProfileComponent className="r"></ProfileComponent>
}
