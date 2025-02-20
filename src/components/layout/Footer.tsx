import React, { ReactNode } from 'react'
import GithubIcon from '../icons/GithubIcon'
import InstagramIcon from '../icons/InstagramIcon'
import LinkedInIcon from '../icons/LinkedInIcon'
import Button from '../ui/Button'
import ExternalLink from '../ui/ExternalLink'

interface T {
  children?: ReactNode
}

const handleLinkClick = () => {}

const Footer: React.FC<T> = ({ children }) => {
  return (
    <div className="wrapper mx-auto mt-30">
      {/* <div className="text-primary-light font-sub-header pb-8 text-center text-xl">
        Follow me on
      </div> */}
      <div className="icons flex justify-around gap-24 pb-12 md:gap-56">
        <ExternalLink link="https://github.com/rjuntivero">
          <GithubIcon />
        </ExternalLink>
        <ExternalLink link="https://www.instagram.com/rjuntivero/">
          <InstagramIcon />
        </ExternalLink>
        <ExternalLink link="https://www.linkedin.com/in/raniel-john-untivero-406b0329b/">
          <LinkedInIcon />
        </ExternalLink>
      </div>
    </div>
  )
}

export default Footer
