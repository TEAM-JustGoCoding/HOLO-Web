import './BoardTable.css';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineCalendar, AiOutlineUser, AiOutlineEye, AiFillHeart, AiFillFire } from "react-icons/ai";
import { BiCoin } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";


function PolicyTable({list}) {
  return(
    <Table bordered hover>
      <tbody>
      {list.map(item=>(
        <tr key={item.id} className={`tableRow ${item.hot ? 'hot' : ''}`}>
          <td>
            <Link className="link" to={`/policypost/${item.id}`}>
              <div className="tableTitle">
                {item.hot?<AiFillFire style={{ fontSize: '3vh', marginRight: '0.5vh', color: 'red'}}/>:null}
                {item.title}
              </div>
              <div className="tableInfo">
                <AiOutlineCalendar style={{ fontSize: '2vh', marginRight: '0.5vh'}}/>{item.reg_date}
                <AiOutlineUser style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.nick_name}
                <AiOutlineEye style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.view}
                <AiFillHeart style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh', color: 'red'}}/>{item.like}
              </div>
            </Link>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function DocumentTable({list}) {
  return(
    <Table bordered hover>
      <tbody>
      {list.map(item=>(
        <tr key={item.id} className={`tableRow ${item.hot ? 'hot' : ''}`}>
          <td>
            <Link className="link" to={`/documentpost/${item.id}`}>
              <div className="tableTitle">
                {item.hot?<AiFillFire style={{ fontSize: '3vh', marginRight: '0.5vh', color: 'red'}}/>:null}
                {item.title}
              </div>
              <div className="tableInfo">
                <AiOutlineCalendar style={{ fontSize: '2vh', marginRight: '0.5vh'}}/>{item.reg_date}
                <AiOutlineUser style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.nick_name}
                <AiOutlineEye style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.view}
                <AiFillHeart style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh', color: 'red'}}/>{item.like}
              </div>
            </Link>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function DeliveryTable({list}) {
  return(
    <Table bordered hover>
      <tbody>
      {list.map(item=>(
        <tr key={item.id} className="tableRow">
          <td>
            <Link className="link" to={`/deliverypost/${item.id}`}>
              <div className="tableTitle">{item.title}</div>
              <div className="tableInfo">
                <AiOutlineCalendar style={{ fontSize: '2vh', marginRight: '0.5vh'}}/>{item.reg_date}
                <AiOutlineUser style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.nick_name}
                <AiOutlineEye style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.view}
                <BiCoin style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.accumulate}/{item.goal}
              </div>
            </Link>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function OttTable({list}) {
  return(
    <Table bordered hover>
      <tbody>
      {list.map(item=>(
        <tr key={item.id} className="tableRow">
          <td>
            <Link className="link" to={`/ottpost/${item.id}`}>
              <div className="tableTitle">{item.title}</div>
              <div className="tableInfo">
                <AiOutlineCalendar style={{ fontSize: '2vh', marginRight: '0.5vh'}}/>{item.reg_date}
                <AiOutlineUser style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.nick_name}
                <AiOutlineEye style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.view}
                <HiOutlineUserGroup style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.accumulate}/{item.goal}
              </div>
            </Link>
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
      <tbody>
      {list.map(item=>(
        <tr key={item.id} className="tableRow">
          <td>
            <Link className="link" to={`/faqpost/${item.id}`}>
              <div className="tableTitle-FAQ">Q. {item.title}</div>
            </Link>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function LikeTable({list}) {
  return(
    <Table bordered hover>
      <tbody>
      {list.map(item=>(
        <tr key={[item.id, item.category]} className="tableRow">
          <td>
            <Link className="link" to={`/documentpost/${item.id}`}>
              <div className="tableTitle">[{item.category}] {item.title}</div>
              <div className="tableInfo">
                <AiOutlineCalendar style={{ fontSize: '2vh', marginRight: '0.5vh'}}/>{item.reg_date}
                <AiOutlineUser style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.nick_name}
                <AiOutlineEye style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh'}}/>{item.view}
                <AiFillHeart style={{ fontSize: '2vh', margin: '0 0.5vh 0 1.5vh', color: 'red'}}/>{item.like}
              </div>
            </Link>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
function ShowTable({type, list}) {
  switch(type){
    case "Policy":
      return <PolicyTable list={list}/>;
    case "Document":
      return <DocumentTable list={list}/>;
    case "Delivery":
      return <DeliveryTable list={list}/>;
    case "Ott":
      return <OttTable list={list}/>;
    case "FAQ":
      return <FAQTable list={list}/>;
    case "Like":
      return <LikeTable list={list}/>;
    default:
      return null
  }
}

const BoardTable = ({type, list}) => {
  return (
    <ShowTable type={type} list={list}></ShowTable>
  );
}

export default BoardTable;