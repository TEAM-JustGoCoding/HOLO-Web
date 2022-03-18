import './App.css';

export default function App() {
  const name = "React";

  function test(){
    console.log("테스트 1번")
  }
  function test2(message){
    console.log(message);
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>{name}</h1>
      <button onClick={test}>테스트 1번</button>
      <button
        onClick={() => {
          test2("테스트 2번");
        }}>테스트 2번</button>
      </header>
    </div>
  );
}
