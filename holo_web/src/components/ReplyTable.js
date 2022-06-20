import './ReplyTable.css';
import React, {useState} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '../components/Modal';
import {MdSubdirectoryArrowRight} from "react-icons/md";
import {getProfileImg} from '../firebase'

const ReplyTable = ({currentUser, replyList, replyEditFunc, replyDeleteFunc, reReplyList, reReplySubmitFunc, reReplyEditFunc, reReplyDeleteFunc}) => {
  const [replyState, setReplyState] = useState(null)
  const [replyEditState, setReplyEditState] = useState(null)
  const [reReplySubmitState, setReReplySubmitState] = useState(null)
  const [reReplyEditState, setReReplyEditState] = useState(null)
  const [replyEdit, setReplyEdit] = useState('')
  const [reReplySubmit, setReReplySubmit] = useState('')
  const [reReplyEdit, setReReplyEdit] = useState('')
  const [checkModalOpen, setCheckModalOpen] = useState(false)

  function replyEditChange(e) {
    if (e.target.value.length > 200) {
      setReplyEdit(e.target.value.slice(0, 200))
    }
    else {
      setReplyEdit(e.target.value)    }
  }
  function reReplySubmitChange (e) {
    if (e.target.value.length > 200) {
      setReReplySubmit(e.target.value.slice(0, 200))
    }
    else {
      setReReplySubmit(e.target.value)
    }
  };
  function reReplyEditChange (e) {
    if (e.target.value.length > 200) {
      setReReplyEdit(e.target.value.slice(0, 200))
    }
    else {
      setReReplyEdit(e.target.value)
    }
  };

  function editReply(replyId){
    if(replyEdit===''){
      setCheckModalOpen(true)
    }
    else{
      replyEditFunc(replyId, replyEdit);
      setReplyState(null);
      setReplyEditState(null);
      setReplyEdit('');
    }
  }
  function submitReReply(replyId){
    if(reReplySubmit===''){
      setCheckModalOpen(true)
    }
    else{
      reReplySubmitFunc(replyId, reReplySubmit);
      setReplyState(null);
      setReReplySubmitState(null);
      setReReplySubmit('');
    }
  }
  function editReReply(reReplyId){
    if(reReplyEdit===''){
      setCheckModalOpen(true)
    }
    else{
      reReplyEditFunc(reReplyId, reReplyEdit);
      setReplyState(null);
      setReReplyEditState(null);
      setReReplyEdit('');
    }
  }
  
  return(
    <div>
      <Table bordered style={{ width: '100%', marginBottom: '0'}}>
        <tbody>
        {replyList.map(item=>(
          <tr key={item.id}>
            <td style={{ padding: '0'}}>
              {replyState==='replyEdit' && replyEditState===item.id
              ? <div>
                  <div className="replyTableInput">
                    <div>
                      <textarea placeholder='댓글을 입력해주세요.' value={replyEdit} spellCheck="false" onChange={replyEditChange} maxLength='200'></textarea>
                      <div>
                        <button onClick={() => {editReply(item.id)}}>수정</button>
                        <button onClick={() => {setReplyState(null); setReplyEditState(null); setReplyEdit('');}}>취소</button>
                      </div>
                    </div>
                  </div>
                </div>
              : <div className="reply">
                  <div className="replyTitle">
                      <div className="replyUser"><div><img src={item.profile} alt=" "/></div><span>{item.nick_name}</span></div>
                      <div className="replyDate">{item.date}</div>
                  </div>
                  <div className="replyContent">{item.content}</div>

                  {replyState==='reReplySubmit' && reReplySubmitState===item.id
                  ?<div>
                    <div className="replyTableInput">
                      <MdSubdirectoryArrowRight style={{fontSize: "30px", padding: "3px"}}/>
                      <div>
                        <textarea placeholder='답글을 입력해주세요.' spellCheck="false" onChange={reReplySubmitChange} maxLength='200'></textarea>
                        <div>
                          <button onClick={() => {submitReReply(item.id)}}>등록</button>
                          <button onClick={() => {setReplyState(null); setReReplySubmitState(null); setReReplySubmit('');}}>취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  :<div className="replyButton">
                      <button onClick={()=>{setReplyState('reReplySubmit'); setReReplySubmitState(item.id)}}>답글</button>
                      {currentUser.toString()===item.user_id
                      ?<div>
                        <button onClick={()=>{setReplyState('replyEdit'); setReplyEditState(item.id); setReplyEdit(item.content);}}>수정</button>
                        <button onClick={()=>{replyDeleteFunc(item.id);}}>삭제</button>
                      </div>
                      :<div/>
                      }
                    </div>
                  }
                </div>
              }

              <Table borderless style={{ marginBottom: '0'}}>
                <tbody>
                {reReplyList.filter(item2=>item2.reply_id===item.id)
                  .map(item2=>(
                    <tr key={item2.id} style={{borderTop: 'solid 1px #DEE2E6'}}>
                      <td style={{ padding: '0'}}>
                        {replyState==='reReplyEdit' && reReplyEditState===item2.id
                        ? <div style={{ padding: '10px'}}>
                            <div className="replyTableInput">
                              <MdSubdirectoryArrowRight style={{fontSize: "30px", padding: "3px"}}/>
                              <div>
                                <textarea placeholder='답글을 입력해주세요.' value={reReplyEdit} spellCheck="false" onChange={reReplyEditChange} maxLength='200'></textarea>
                                <div>
                                  <button onClick={() => {editReReply(item2.id)}}>수정</button>
                                  <button onClick={() => {setReplyState(null); setReReplyEditState(null); setReReplyEdit('');}}>취소</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        :<div className="reply">
                            <div className="replyTitle">
                                <MdSubdirectoryArrowRight style={{fontSize: "30px", padding: "3px"}}/>
                                <div className="replyUser"><div><img src={item2.profile} alt=" "/></div><span>{item2.nick_name}</span></div>
                                <div className="replyDate">{item2.date}</div>
                            </div>
                            <div className="replyContent" style={{paddingLeft: "35px"}}>{item2.content}</div>
                            {currentUser.toString()===item2.user_id
                            ?<div className="replyButton">
                              <div>
                                <button onClick={()=>{setReplyState('reReplyEdit'); setReReplyEditState(item2.id); setReReplyEdit(item2.content);}}>수정</button>
                                <button onClick={()=>{reReplyDeleteFunc(item2.id)}}>삭제</button>
                              </div>
                             </div>
                            :<div/>
                            }
                          </div>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Modal type="Info" open={checkModalOpen} close={()=>setCheckModalOpen(false)}>내용을 입력해주세요!</Modal>
    </div>
  );
}

class ShowReplyTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      replyList : [],
      reReplyList : []
    }
  }

  componentDidMount(){
    this.setState({
      replyList: this.props.replyList,
      reReplyList: this.props.reReplyList
    })
    // setTimeout(()=>{
    //   this.forceUpdate()
    // },1000)

    // setTimeout(()=>{
    // var temp = this.props.replyList
    // for(let i=0;i<temp.length;i++){
    //   getProfileImg(temp[i].mail).then((img) => {
    //     temp[i].profile = img
    //     this.setState({
    //       replyList: temp
    //     })
    //   })
    //   console.log("!")
    // }
    // }, 100)

  }              
  componentDidUpdate(prevProps) {
    if(this.props.replyList !== prevProps.replyList){
      var replyData = this.props.replyList
      for(let i=0;i<replyData.length;i++){
        if(sessionStorage.getItem(replyData[i].mail)===null){
          getProfileImg(replyData[i].mail).then((img) => {
            replyData[i].profile = img
            sessionStorage.setItem(replyData[i].mail, img)
            this.setState({
              replyList: replyData
            })
          })
        }
        else{
          replyData[i].profile = sessionStorage.getItem(replyData[i].mail)
          this.setState({
            replyList: replyData
          })
        }
      }
      setTimeout(()=>{
        this.forceUpdate()
      }, 10)    
    }
    if(this.props.reReplyList !== prevProps.reReplyList){
      var reReplyData = this.props.reReplyList
      for(let i=0;i<reReplyData.length;i++){
        if(sessionStorage.getItem(reReplyData[i].mail)===null){
          getProfileImg(reReplyData[i].mail).then((img) => {
            reReplyData[i].profile = img
            this.setState({
              reReplyList: reReplyData
            })
          })
        }
        else{
          reReplyData[i].profile = sessionStorage.getItem(reReplyData[i].mail)
          this.setState({
            reReplyList: reReplyData
          })
        }
      }
      setTimeout(()=>{
        this.forceUpdate()
      }, 10)
    }
  }

  render() {
    return(
      <ReplyTable currentUser={this.props.currentUser} replyList={this.state.replyList} replyEditFunc={this.props.replyEditFunc} replyDeleteFunc={this.props.replyDeleteFunc}
      reReplyList={this.state.reReplyList} reReplySubmitFunc={this.props.reReplySubmitFunc} reReplyEditFunc={this.props.reReplyEditFunc} reReplyDeleteFunc={this.props.reReplyDeleteFunc}/>
    );
  }
}

export default ShowReplyTable;
