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
        This blog started when I joined{" "}
        <a href="https://codurance.com">Codurance</a> as an apprentice after
        moving to London at 2019. I've moved on and work at{" "}
        <a href="https://landbay.co.uk">Landbay</a>. Reach out to me through{" "}
        <a href="https://www.linkedin.com/in/zhiqiang-qiao/">LinkedIn</a> or by{" "}
        <a href="mailto:me@zhiqiangqiao.com">Mail</a>
      </div>
    </div>
  </>
)

export default withLayout(AboutPage)
