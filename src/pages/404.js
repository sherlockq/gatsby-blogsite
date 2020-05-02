import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import withLayout from "../utils/withLayout"

const useFixedPlaceholderImage = () => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(relativePath: { eq: "dachshund.png" }) {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  return placeholderImage.childImageSharp.fixed
}

const Image = () => {
  const image = useFixedPlaceholderImage()
  return <Img fixed={image} />
}

export const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p>Here's Charlie the dachsund to make you feel better.</p>
    <Image />
  </>
)

export default withLayout(NotFoundPage)
