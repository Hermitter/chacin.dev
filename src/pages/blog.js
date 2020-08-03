import React from "react"

import { graphql } from "gatsby"
import { Link } from "gatsby";

import Layout from "../components/layout"

export default ({ data }) => <Layout>
    <p>Blog Page</p>

    {/* Blog post preview cards */}
    <ul>
        {data.allMarkdownRemark.edges.map((value, index) => {
            return <li><Link to={value.node.frontmatter.slug}>{JSON.stringify(value.node.frontmatter.title)}</Link></li>
        })}
    </ul>
</Layout>

export const blogQuery = graphql`{
    allMarkdownRemark {
        edges {
            node {
                frontmatter {
                    date
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
    }
}`
