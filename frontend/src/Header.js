import './Header.css';

function Blabla(props){
  return (
    <h1>{props.title}</h1>
  );
}

function Header() {
  return (
    <div><Blabla title="HEADER"></Blabla></div>
  );
}

export default Header;
