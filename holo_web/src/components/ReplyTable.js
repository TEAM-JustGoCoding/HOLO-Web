import './ReplyTable.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {images} from '../images';

function Reply({list, editFunc, deleteFunc}) {
  return(
    <Table bordered>
      <tbody>
      {list.map(item=>(
        <tr key={item.id}>
          <td>
            <div className="replyTitle">
                <div className="replyUser"><img src={images.user} alt="User"/>{item.nick_name}</div>
                <div className="replyDate">{item.date}</div>
            </div>
            <div className="replyContent">{item.content}</div>
            <div className="replyButton">
                <button>답글</button>
                <div>
                    <button onClick={()=>{editFunc(item.id, item.content);}}>수정</button>
                    <button onClick={()=>{deleteFunc(item.id)}}>삭제</button>
                </div>
            </div>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function ReReply({list, editFunc, deleteFunc}){
    return(
        null
    );
}

function ShowTable({type, list, editFunc, deleteFunc}) {
  switch(type){
    case "Reply":
      return <Reply list={list} editFunc={editFunc} deleteFunc={deleteFunc}/>;
    case "ReReply":
      return <ReReply list={list} editFunc={editFunc} deleteFunc={deleteFunc}/>;
    default:
      return null
  }
}

const ReplyTable = ({type, list, editFunc, deleteFunc}) => {
  return (
    <ShowTable type={type} list={list} editFunc={editFunc} deleteFunc={deleteFunc}></ShowTable>
  );
}

export default ReplyTable;
