import './ReplyTable.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {images} from '../images';

function Reply({list, editFuc, deleteFuc}) {
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
                    <button onClick={()=>{editFuc(item.content)}}>수정</button>
                    <button onClick={deleteFuc}>삭제</button>
                </div>
            </div>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function ReReply({list, editFuc, deleteFuc}){
    return(
        null
    );
}

function ShowTable({type, list, editFuc, deleteFuc}) {
  switch(type){
    case "Reply":
      return <Reply list={list} editFuc={editFuc} deleteFuc={deleteFuc}/>;
    case "ReReply":
      return <ReReply list={list} editFuc={editFuc} deleteFuc={deleteFuc}/>;
    default:
      return null
  }
}

const ReplyTable = ({type, list, editFuc, deleteFuc}) => {
  return (
    <ShowTable type={type} list={list} editFuc={editFuc} deleteFuc={deleteFuc}></ShowTable>
  );
}

export default ReplyTable;
