import React, { Component } from 'react';


class SearchPostComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keyword: ''
        }

        this.changeKeywordHandler = this.changeKeywordHandler.bind(this);
    }

    changeKeywordHandler = (event) => {
        this.setState({ keyword: event.target.value });
    }

    searchKeyword(keyword) {
        window.location.replace("search/"+keyword);
    }

    render() {
        return (
            <div className="searchMenu">
                    <div style={{ float: "left" }}>
                        <button className="createButton" onClick={() => this.searchKeyword(this.state.keyword)}>검색</button>
                    </div>
                    <div style={{ float: "right" }}>
                        <input placeholder="원하는 키워드를 입력해주세요." name="keyword" className="searchForm"
                            value={this.state.keyword} onChange={this.changeKeywordHandler} />
                    </div>
            </div>
        );
    }
}
export default SearchPostComponent;