import './Post.css';
import React from 'react';
import axios from 'axios';

function ShowPost(props) {
  //var id = props.state.id;
  var title = props.state.title;
  var content = props.state.content;

  return (
    <div>
      <div className="postHeaderBar">
        <div>FAQ</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postFAQContent">{content}</div>
    </div>
  );
}

class Post extends React.Component {
  constructor () {
    super ();

    var pathname = window.location.pathname;
    var words = pathname.split('/');
    console.log(words[2]);

    this.state = {
       id : words[2],
       title : "",
       content : "",
    };
  
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    console.log(this.state.id);

    axios.post("http://holo.dothome.co.kr/findFaqPost.php", JSON.stringify({postid: this.state.id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        console.log(response.data[0]);
        this.setState ({
          title: response.data[0].title,
          content: response.data[0].content });  
      })
      .catch(function(error) {
        console.log(error);
      });          
  };                         

  render() {
    return(
      <ShowPost state={this.state}/>
    );
  }
}

export default Post;