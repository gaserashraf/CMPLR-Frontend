import React, { useRef, useCallback, Fragment } from 'react';
import PostComponent from './postComponent/containers/PostComponent';
import { LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
export default function VerticalPostsView(props) {
    const { posts, error, isPending, hasMore, setPageNumber, isRadar } = props;
    const user = JSON.parse(localStorage.getItem('user'));
    const observer = useRef();
    const lastPostElementRef = useCallback(
        node => {
            if (isPending) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isPending, hasMore]
    );
    return (
        <section className={isRadar ? 'container-grid' : 'normal-layout'}>
            {posts &&
                posts.map((post, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <Fragment ref={lastPostElementRef} key={index}>
                                <PostComponent
                                    post={post}
                                    userBlogName={user?.blogName}
                                    isFollowed={true}
                                    radar={isRadar}
                                />
                            </Fragment>
                        );
                    } else {
                        return (
                            <PostComponent
                                key={index}
                                post={post}
                                isFollowed={true}
                                userBlogName={user?.blogName}
                                radar={isRadar}
                            />
                        );
                    }
                })}

            {error && <div className="no-data-error">{"Couldn't load"}</div>}
            {isPending && <LinearProgress />}
        </section>
    );
}

VerticalPostsView.propTypes = {
    posts: PropTypes.array,
    error: PropTypes.string,
    isPending: PropTypes.bool,
    hasMore: PropTypes.bool,
    setPageNumber: PropTypes.func,
    isRadar: PropTypes.bool
};