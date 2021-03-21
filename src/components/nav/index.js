import React from "react";
import { Link } from "gatsby";
import "./styles.scss";

export default () => (
  <div id="nav">
    <ul>
      <li><Link to="/">Home</Link></li>

      <li><Link to="/about/">About</Link></li>

      <li><Link to="/blog/">Blog</Link></li>
    </ul>
  </div>
);
