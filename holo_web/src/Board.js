import './Board.css';

export default function Board() {
    function search(){
        console.log("Search")
    }

    return (
        <div className="Board">
        <header className="Board-header">
            <h1>정보 게시판 화면</h1>
            <button onClick={search}>검색 화면 이동</button> 
        </header>
        </div>
    );
}