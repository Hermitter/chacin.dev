import React from "react"
import { Link, graphql } from "gatsby";
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx";
import Clipboard from 'react-clipboard.js';

import Layout from "../components/layout"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, body } = mdx;

  let featuredImgFluid = frontmatter.featuredImage.childImageSharp.fluid;
  let previewCardImgFluid = frontmatter.previewCardImage.childImageSharp.fluid;

  return (
    <Layout>
      <div className="content">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>

        <Img fluid={featuredImgFluid} />
        {/* <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: body }}
          /> */}

        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
`