import React from "react"

import SEO from "../components/seo"
import withLayout from "../utils/withLayout"

import "../styles/about.scss"

export const AboutPage = () => (
  <>
    <SEO title="About" />
    <div className="about-container">
      <h1>About</h1>
      <div className="about-content">
        I'm currently working at {" "}
        <a href="https://codurance.com">Codurance</a> as an apprentice, find me {' '}
        <a href="https://codurance.com/about-us/our-people/#team-sherlockqiao">Here</a>.
      </div>
    </div>
  </>
)

export default withLayout(AboutPage)
