import React, { memo, ReactNode } from 'react';
import GithubIcon from '../icons/GithubIcon';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import ExternalLink from '../ui/ExternalLink';

interface T {
  children?: ReactNode;
}

// const handleLinkClick = () => {}

const Footer: React.FC<T> = () => {
  return (
    <footer className="wrapper bg-primary-light flex flex-col items-center justify-center gap-8 p-12">
      {/* <div className="text-primary-light font-sub-header pb-8 text-center text-xl">
        Follow me on
      </div> */}
      {/* <h1 className="text-secondary-light text-xl font-bold">Contact Me</h1> */}
      <div className="icons text-secondary-light flex justify-around gap-12 sm:gap-24 md:gap-36">
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
      <h1 className="text-secondary-light text-xl font-bold tracking-widest">JSHOP</h1>
    </footer>
  );
};

export default memo(Footer);
