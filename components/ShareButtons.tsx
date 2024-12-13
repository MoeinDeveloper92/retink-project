import React from 'react';
import {
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  InstapaperIcon,
} from 'react-share';

const ShareButtons = () => {
  return (
    <>
      <h3 className="text-xl text-center pt-2 font-bold ">
        Share This Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={''}
          //   quote={''}
          //   hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <InstapaperShareButton url="">
          <InstapaperIcon />
        </InstapaperShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
