import './Header.css';

function Blabla(props){
  return (
    <h1>{props.title}</h1>
  );
}

function Body() {
  return (
    <div><Blabla title="BODY"></Blabla></div>
  );
}

export default Body;
