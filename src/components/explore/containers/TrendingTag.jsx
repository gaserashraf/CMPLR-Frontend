import React, { useContext } from 'react';
import {
    themes,
    ThemeContext
} from '../../../contexts/themeContext/ThemeContext';
import PropTypes from 'prop-types';

export default function TrendingTag({ color, tag, img, order }) {
    const theme = useContext(ThemeContext)[0];
    return (
        <div
            className="trending-tag"
            style={{
                background: `rgba(${color}, 0.25)`
            }}
        >
            <div
                className="tag-info"
                style={{
                    color: `rgb(${themes[theme].whiteOnDark})`
                }}
            >
                <div
                    className="tag-number"
                    style={{
                        color: 'black',
                        background: `rgb(${color})`
                    }}
                >
                    {order}
                </div>{' '}
                {tag}
            </div>
            <div className="tag-img">
                <img src={img} />
            </div>
        </div>
    );
}

TrendingTag.propTypes = {
    color: PropTypes.string,
    img: PropTypes.string,
    tag: PropTypes.string,
    order: PropTypes.string
};
