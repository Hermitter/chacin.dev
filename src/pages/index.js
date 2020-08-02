import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
// import SEO from "../components/seo";

export default () => <Layout>
    <div id="profile-picture">
        <img height="200" width="200" src="https://avatars0.githubusercontent.com/u/17160717?s=460&u=b12f94db52c1d03f145bc9c21f6c8f10ef595b48&v=4"></img>
        <img height="200" width="200" src="/images/ferris_cute.svg"></img>
    </div>

    <h1>Carlos Chacin</h1>
    <h4>Software Developer</h4>

    <p>Welcome to my site! Feel free to take off your shoes and make youself at home.</p>

    <img style={{ padding: "5px" }} height="200" width="200" src="/logos/twitter.svg"></img>
    <img style={{ padding: "5px" }} height="200" width="200" src="/logos/github.svg"></img>
    <img style={{ padding: "5px" }} height="200" width="200" src="/logos/linkedin.svg"></img>

</Layout>;
