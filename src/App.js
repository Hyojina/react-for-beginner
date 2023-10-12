import { useEffect, useState } from "react";

function Hello() {
  function byFn() {
    console.log("Bye :(");
  }
  function hiFn() {
    console.log("Hi :)");
    return byFn;
  }

  // return한 함수는 컴포넌트가 사라질 때 실행된다
  useEffect(hiFn, []);

  // 위와 동일
  // useEffect(() => {
  //   console.log("Created!");
  //   return () => console.log("Destroyed!");
  // }, []);

  return <h1>Hello</h1>;
}

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(true);

  const onClick = () => setCounter((current) => current + 1);
  const onChange = (event) => setKeyword(event.target.value);
  const showAndHide = () => setShow((prev) => !prev);

  // 빈 배열이라 지켜볼 게 없으므로 한 번만 실행되게 된다
  useEffect(() => console.log("I run only once."), []);

  // onChange 이벤트 내에서 변화를 다루면,
  // state의 변경값이 바로바로 적용되지 않으므로
  // state의 값이 변경됨에 따라 코드를 실행하고 싶다면
  // useEffect에서 다루는 것이 맞다!!
  useEffect(() => {
    if (keyword && keyword.length > 5)
      console.log("I run when 'keyword' changes.(글자 5 초과시)");
  }, [keyword]);

  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);

  useEffect(() => {
    console.log("I run when 'keyword' or 'counter' changes.");
  }, [keyword, counter]);

  return (
    <div>
      {show ? <Hello /> : null}
      <button onClick={showAndHide}>{show ? "Hide" : "Show"}</button>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search Here..."
      />
      <button onClick={onClick}>Click me!</button> <span>{counter}</span>
    </div>
  );
}

export default App;
