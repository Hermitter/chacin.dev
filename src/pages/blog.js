import React from "react"

import { graphql } from "gatsby"
import { Link } from "gatsby";

import Layout from "../components/layout"

export default ({ data }) => <Layout>
  <p>Blog Page</p>

  {/* Blog post preview cards */}
  <ul>
    {data.allMdx.edges.map((value, index) => {
      let metadata = value.node.frontmatter;
      let previewImage = metadata.previewImage;

      return <li key={index.toString()}>
        <Link to={metadata.slug}>{JSON.stringify(metadata.title)}</Link>
      </li>
    })}
  </ul>
</Layout>

export const blogQuery = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
  allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
    edges {
      node {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          slug
          previewCardImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`
