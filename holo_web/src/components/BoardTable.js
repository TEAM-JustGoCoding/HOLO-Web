import './BoardTable.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function InfoTable({list}) {
  return(
    <Table bordered hover>
      <tbody className="tableBody">
      {list.map(item=>(
        <tr key={item.id} onClick={()=>search(item.id)}>
          <td>
            <div className="tableTitle">{item.title}</div>
            <div className="tableInfo">{item.reg_date} | {item.nick_name} | 👁 {item.view} | ♥ {item.like}</div>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function FAQTable({list}) {
  return(
    <Table bordered hover>
      <tbody className="tableBody">
      {list.map(item=>(
        <tr key={item.id} onClick={()=>search(item.id)}>
          <td>
            <div className="tableTitle-FAQ">Q. {item.title}</div>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function ShowTable({type, list}) {
  switch(type){
    case "Info":
      return <InfoTable list={list}/>;
    case "FAQ":
      return <FAQTable list={list}/>;
    default:
      return null
  }
}

function search(id){
  console.log(id)
}

const BoardTable = ({type, list}) => {
  return (
    <ShowTable type={type} list={list}></ShowTable>
  );
}

export default BoardTable;