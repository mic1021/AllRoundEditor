import './Sidebar.css';

function Blabla(props){
  return (
    <h1>{props.title}</h1>
  );
}

function Sidebar() {
  return (
    <div><Blabla title="SIDEBAR"></Blabla></div>
  );
}

export default Sidebar;
