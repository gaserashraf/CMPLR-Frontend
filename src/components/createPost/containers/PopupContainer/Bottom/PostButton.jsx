import { Popover } from '@mui/material';
import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import DropDownPostList from './DropDownPostList';

export default function PostButton(props) {
    const { handlePost, postType, setPostType, content, titlePost } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopover = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPost = Boolean(anchorEl);
    return (
        <>
            <div className="post-form-save-button">
                <div className="split-button">
                    {/**TODO: add a spinner */}
                    <button
                        className="to-post-button"
                        onClick={handlePost}
                        disabled={content === '' || titlePost === ''}
                    >
                        Post
                    </button>
                    <div
                        aria-describedby="popover_post"
                        className="dropdown-area"
                        onClick={handlePopover}
                    >
                        <RiArrowDropDownLine />
                    </div>
                    <Popover
                        id={'popover_post'}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                        open={openPost}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                    >
                        <DropDownPostList
                            postType={postType}
                            setPostType={setPostType}
                        />
                    </Popover>
                </div>
            </div>
        </>
    );
}

PostButton.propTypes = {
    handlePost: PropTypes.func.isRequired,
    postType: PropTypes.string.isRequired,
    setPostType: PropTypes.func.isRequired,
    content: PropTypes.any.isRequired,
    titlePost: PropTypes.string.isRequired
};