import React from 'react';
import PropTypes from 'prop-types';
import 'animate.css';
import VideoList from '../VideoList';

const VideoFeed = ({ title, subtitle, videos }) => {
    return (
        <div className="p-8 lg:p-20 text-center bg-pink">
            <div className="mb-10 flex flex-col items-center">
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-red w-full sm:w-2/3" data-aos="zoom-in-up">
                    {title}
                </h1>
                <p className="mb-4 text-base sm:text-lg" data-aos="fade-in-left">{subtitle}</p>
            </div>
            <VideoList videos={videos} />
        </div>
    );
};

VideoFeed.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    videos: PropTypes.arrayOf(
        PropTypes.shape({
            video: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default VideoFeed;