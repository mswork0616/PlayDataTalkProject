import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import { useParams } from 'react-router-dom';

export default ({ userObj }) => {
    const stat = useParams();
class CreatePostComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            keyword: '',
            userId: userObj.userId,
            keywordConfirm: /^#[\w가-힣]/
        }

        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);
        this.createBoardSuccess = this.createBoardSuccess.bind(this);
        this.createBoardFail = this.createBoardFail.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    componentDidMount() {
        if (stat.postId === '_create') {
            return
        } else {
            BoardService.getOneBoard(stat.postId).then( (res) => {
                if(res.data.userId.userId == this.state.userId){
                    let board = res.data;
                    console.log("board => "+ JSON.stringify(board));
                    
                    this.setState({
                            text: board.text,
                            keyword: board.keyword
                        });
                }
                else{
                    alert("수정할 수 없는 글입니다.");
                    window.location.replace('/main');
                }
            });
        }
    }

    changeTextHandler = (event) => {
        this.setState({ text: event.target.value });
    }
    changeKeywordHandler = (event) => {
        this.setState({ keyword: event.target.value });
    }


    createBoardSuccess = (event) => {
        console.log(this.state.keywordConfirm.test(this.state.keyword));
        event.preventDefault();
        let post = {
            postId:null,
            text: this.state.text,
            keyword: this.state.keyword.match(/#[\w가-힣]+/g).toString()
        };
        let text = {
            post: post,
            userId: this.state.userId
        }

        if (stat.postId === '_create') {
            BoardService.createPost(text).then(res => {
                console.log('크리에이트')
                window.location.replace('/main');
            });
        }
        else {
            text.post.postId = stat.postId;
            BoardService.updatePost(stat.postId, text).then(res => {
                console.log(text)
                window.location.replace('/main');
            });
        }

    }
    createBoardFail = (event) => {
        alert("키워드를 다시 작성해주세요.")
    }

    createKeyword = (event) => {
        event.preventDefault();
        let text = "text=" + this.state.text;
        BoardService.createKeyword(text).then(res => {
            console.log(res.data);
            this.setState({ keyword: res.data.message.toString() });
        })
    }

    cancel() {
        console.log("왜 안되냐구")
        window.location.replace('/main');
        // this.props.history.push('/main');
    }

    render() {
        return (
            <div>
                <div className="createPost1" >
                    <div className="row">
                        <div className="">{stat.postId === '_create'?
                            <div style={{ fontFamily: "postFont" }} className="test">새로운 글을 작성해주세요</div>
                            :<div style={{ fontFamily: "postFont" }} className="test">글을 수정해주세요</div>
                        }
                            <div className="createPost">
                                    <div className="form-group">
                                        <label> Text  </label>
                                        <textarea placeholder="내용을 입력해주세요." name="text" className="textForm"
                                            value={this.state.text} onChange={this.changeTextHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Keyword </label>
                                        <button className="createButton" onClick={this.createKeyword} style={{ marginLeft: "10px" }}>키워드 추천</button>
                                        <input placeholder="원하는 키워드를 입력해주세요.(최대 3개)    예시) #날씨,#태풍" name="keyword" className="keywordForm"
                                            value={this.state.keyword} onChange={this.changeKeywordHandler} />
                                    </div>
                                    <button className="createButton" onClick={this.state.keywordConfirm.test(this.state.keyword) ? this.createBoardSuccess : this.createBoardFail}>저장</button>
                                    <button className="createButton" onClick={this.cancel} style={{ marginLeft: "10px" }}>취소</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
return <CreatePostComponent className="r"></CreatePostComponent>
}