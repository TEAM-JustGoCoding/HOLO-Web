import './ReplyTable.css';
import React, {useState} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '../components/Modal';
import {images} from '../images';
import {MdSubdirectoryArrowRight} from "react-icons/md";

const ReplyTable = ({currentUser, replyList, replyEditFunc, replyDeleteFunc, reReplyList, reReplySubmitFunc, reReplyEditFunc, reReplyDeleteFunc}) => {
  const [replyEditState, setReplyEditState] = useState(null)
  const [reReplySubmitState, setReReplySubmitState] = useState(null)
  const [reReplyEditState, setReReplyEditState] = useState(null)
  const [replyEdit, setReplyEdit] = useState('');
  const [reReplySubmit, setReReplySubmit] = useState('');
  const [reReplyEdit, setReReplyEdit] = useState('');
  const [checkModalOpen, setCheckModalOpen] = useState(false);

  function replyEditChange(e) {
    setReplyEdit(e.target.value)
  }
  function reReplySubmitChange (e) {
    setReReplySubmit(e.target.value)
  };
  function reReplyEditChange (e) {
    setReReplyEdit(e.target.value)
  };

  function editReply(replyId){
    if(replyEdit===''){
      setCheckModalOpen(true)
    }
    else{
      replyEditFunc(replyId, replyEdit);
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
              {replyEditState===item.id
              ? <div>
                  <div className="replyTableInput">
                    <div>
                      <textarea placeholder='댓글을 입력해주세요.' value={replyEdit} spellCheck="false" onChange={replyEditChange}></textarea>
                      <div>
                        <button onClick={() => {editReply(item.id)}}>수정</button>
                        <button onClick={() => {setReplyEditState(null); setReplyEdit('');}}>취소</button>
                      </div>
                    </div>
                  </div>
                </div>
              : <div className="reply">
                  <div className="replyTitle">
                      <div className="replyUser"><img src={images.user} alt="User"/>{item.nick_name}</div>
                      <div className="replyDate">{item.date}</div>
                  </div>
                  <div className="replyContent">{item.content}</div>

                  {reReplySubmitState===item.id
                  ?<div>
                    <div className="replyTableInput">
                      <MdSubdirectoryArrowRight style={{fontSize: "30px", padding: "3px"}}/>
                      <div>
                        <textarea placeholder='답글을 입력해주세요.' spellCheck="false" onChange={reReplySubmitChange}></textarea>
                        <div>
                          <button onClick={() => {submitReReply(item.id)}}>등록</button>
                          <button onClick={() => {setReReplySubmitState(null); setReReplySubmit('');}}>취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  :<div className="replyButton">
                      <button onClick={()=>setReReplySubmitState(item.id)}>답글</button>
                      <div>
                          <button onClick={()=>{setReplyEditState(item.id); setReplyEdit(item.content);}}>수정</button>
                          <button onClick={()=>{replyDeleteFunc(item.id)}}>삭제</button>
                      </div>
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
                        {reReplyEditState===item2.id
                        ? <div style={{ padding: '10px'}}>
                            <div className="replyTableInput">
                              <MdSubdirectoryArrowRight style={{fontSize: "30px", padding: "3px"}}/>
                              <div>
                                <textarea placeholder='답글을 입력해주세요.' value={reReplyEdit} spellCheck="false" onChange={reReplyEditChange}></textarea>
                                <div>
                                  <button onClick={() => {editReReply(item2.id)}}>수정</button>
                                  <button onClick={() => {setReReplyEditState(null); setReReplyEdit('');}}>취소</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        :<div className="reply">
                            <div className="replyTitle">
                                <MdSubdirectoryArrowRight style={{fontSize: "30px", padding: "3px"}}/>
                                <div className="replyUser"><img src={images.user} alt="User"/>{item2.nick_name}</div>
                                <div className="replyDate">{item2.date}</div>
                            </div>
                            <div className="replyContent" style={{paddingLeft: "35px"}}>{item2.content}</div>
                            {currentUser===item2.user_id
                            ?<div className="replyButton">
                              <div>
                                <button onClick={()=>{setReReplyEditState(item2.id); setReReplyEdit(item2.content);}}>수정</button>
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
      <Modal type="Info" open={checkModalOpen} close={()=>setCheckModalOpen(false)}>
        내용을 입력해주세요!
      </Modal>
    </div>
  );
}

export default ReplyTable;
