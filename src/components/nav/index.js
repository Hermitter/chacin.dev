import React from "react";
import { Link } from "gatsby";
import "./styles.scss";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false //Set render state to false
    }
  }


  render() {
    return <div id="nav">
      <ul>
        <li><Link to="/">Home</Link></li>

        <li><Link to="/about/">About</Link></li>

        <li><Link to="/blog/">Blog</Link></li>
      </ul>
    </div >
  }
}
export default Nav;

// export default () => (
//   <div id="nav">
//     <ul>
//       <li><Link to="/">Home</Link></li>

//       <li><Link to="/about/">About</Link></li>

//       <li><Link to="/blog/">Blog</Link></li>
//     </ul>
//   </div>
// );
