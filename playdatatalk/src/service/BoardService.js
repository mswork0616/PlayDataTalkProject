import axios from 'axios';

// const BOARD_API_BASE_URL = "http://localhost:8080/playdatatalk";
// const PYTHON_API = "http://localhost:5000";

const BOARD_API_BASE_URL = "http://playdatatalk.net:8080/playdatatalk";
const PYTHON_API = "http://playdatatalk.net:5000";

class BoardService {

    goProfile(userId) {
        return axios.get(BOARD_API_BASE_URL + "/goprofile/" + userId);
    }

    getBoards() {
        return axios.get(BOARD_API_BASE_URL + "/gohome");
    }

    createPost(text) {
        return axios.post(BOARD_API_BASE_URL + "/write", text);
    }

    getOneBoard(postId) {
        return axios.get(BOARD_API_BASE_URL + "/getting/" + postId);
    }

    updatePost(postId, text) {
        return axios.put(BOARD_API_BASE_URL + "/posting/" + postId, text);
    }

    ilike(like) {
        return axios.put(BOARD_API_BASE_URL + "/ilike", like);
    }

    updateUser(user) {
        return axios.put(BOARD_API_BASE_URL + "/updateuser", user);
    }

    deletePost(postId) {
        return axios.delete(BOARD_API_BASE_URL + "/deletepost/" + postId);
    }

    createKeyword(test) {
        console.log(test);
        return axios.post(PYTHON_API + "/make-hashtag", test);
    }

    countkeyword(){
        return axios.get(BOARD_API_BASE_URL + "/countkeyword");
    }

    searchkeyword(searchKeyword) {
        console.log("searchKeyword : "+searchKeyword);
        return axios.get(BOARD_API_BASE_URL + "/searchkeyword/" + searchKeyword);
    }

    getUser(userId) {
        console.log(userId);
        return axios.post(BOARD_API_BASE_URL + "/getuserinform/" + userId);
    }
}

export default new BoardService();