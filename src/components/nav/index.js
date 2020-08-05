import React from "react";
import { Link } from "gatsby";

export default () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>

      <li><Link to="/about/">About</Link></li>

      <li><Link to="/blog/">Blog</Link></li>
    </ul>
  </div>
);
