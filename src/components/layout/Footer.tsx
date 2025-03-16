import React, { memo, ReactNode } from 'react'
import GithubIcon from '../icons/GithubIcon'
import InstagramIcon from '../icons/InstagramIcon'
import LinkedInIcon from '../icons/LinkedInIcon'
import ExternalLink from '../ui/ExternalLink'

interface T {
  children?: ReactNode
}

// const handleLinkClick = () => {}

const Footer: React.FC<T> = () => {
  return (
    <div className="mt-30">
      <div className="bg-secondary-light/70 w-full pt-8 shadow-xl outline-3"></div>

      <div className="wrapper bg-primary-light flex flex-col items-center justify-center gap-8 p-12">
        {/* <div className="text-primary-light font-sub-header pb-8 text-center text-xl">
          Follow me on
        </div> */}
        {/* <h1 className="text-secondary-light text-xl font-bold">Contact Me</h1> */}
        <div className="icons text-secondary-light flex justify-around gap-24 md:gap-32">
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
        <h1 className="font-big-header text-secondary-light text-xl font-thin tracking-widest">
          JSHOP
        </h1>
      </div>
    </div>
  )
}

export default memo(Footer)
