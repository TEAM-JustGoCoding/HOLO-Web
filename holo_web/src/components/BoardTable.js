import './BoardTable.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function search(id){
  console.log(id)
}

const BoardTable = (props) => {
  const {list} = props;

  return (
    <Table bordered hover className="test2">
      <tbody className="test">
      {list.map(item=>(
        <tr key={item.id} onClick={()=>search(item.id)}>
          <td>
            <div className="boardTitle">{item.title}</div>
            <div className="boardInfo">{item.date} | {item.writer} | 👁 {item.view} | ♥ {item.like}</div>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

export default BoardTable;