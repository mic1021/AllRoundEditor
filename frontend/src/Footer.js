import './Footer.css';

function Blabla(props){
  return (
    <h1>{props.title}</h1>
  );
}

function Footer() {
  return (
    <div><Blabla title="FOOTER"></Blabla></div>
  );
}

export default Footer;
