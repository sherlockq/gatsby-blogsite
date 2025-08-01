import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SEO from "../components/seo"
import withLayout from "../utils/withLayout"

const usePlaceholderImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "dachshund.png" }) {
        childImageSharp {
          gatsbyImageData(width: 200, layout: FIXED)
        }
      }
    }
  `)
  return getImage(data.placeholderImage)
}

const Image = () => {
  const image = usePlaceholderImage()
  return <GatsbyImage image={image} alt="Charlie the dachshund" />
}

export const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p>Here's Charlie the dachshund to make you feel better.</p>
    <Image />
  </>
)

export default withLayout(NotFoundPage)
