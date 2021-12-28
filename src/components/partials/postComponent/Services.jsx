/* eslint-disable camelcase */
import Axios from 'axios';
import { apiBaseUrl } from '../../../config.json';

//=================================================Footer Services============================================
export function handleLikePost(setLoveFillColor, setIsLiked, postId, token) {
    Axios({
        method: 'POST',
        url: `${apiBaseUrl}/user/like`,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            id: postId
        }
    })
        .then(res => {
            if (res.status === 200) {
                setLoveFillColor('rgb(255,73,47)');
                setIsLiked(true);
            }
        })
        .catch(() => {});
}

export function handleUnlikePost(setLoveFillColor, setIsLiked, postId, token) {
    Axios({
        method: 'DELETE',
        url: `${apiBaseUrl}/user/unlike`,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            id: postId
        }
    })
        .then(res => {
            if (res.status === 200) {
                setLoveFillColor('gray');
                setIsLiked(false);
            }
        })
        .catch(() => {});
}

export function deletePost(postId, setIsModalOpen, token, navigate) {
    Axios({
        method: 'DELETE',
        url: `${apiBaseUrl}/post/delete/${postId}`,
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.data.meta.status_code === 200) {
                navigate('/empty');
                navigate('/dashboard');
                setIsModalOpen(false);
            }
        })
        .catch(() => {});
}

//=================================================PostComponent Services============================================

export function block(
    blogName,
    userBlogName,
    setIsOptionListOpen,
    setIsModalOpen,
    setIsMsgModalOpen,
    setBlockResponse,
    token
) {
    return Axios({
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        url: `${apiBaseUrl}/blog/${userBlogName}/blocks`,
        data: {
            blockName: blogName
        }
    })
        .then(res => {
            setIsOptionListOpen(false);
            setIsModalOpen(false);
            setIsMsgModalOpen(true);
            if (res?.data?.meta?.status_code === 200)
                setBlockResponse(`${blogName} has been blocked.`);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

//=================================================Notes Services============================================
export function getPostNotes(blogIdentifier, setNotes, setCounts, postId) {
    Axios({
        url: `${apiBaseUrl}/post/notes`,
        method: 'GET',
        params: {
            'blog-identifier': blogIdentifier,
            post_id: postId
        }
    })
        .then(res => {
            setNotes(res.data[0].notes);
            let count = {
                totalLikes: res.data[0]['total_likes'],
                totalReblogs: res.data[0]['total_reblogs'],
                totalReplys: res.data[0]['total_replys']
            };
            setCounts(count);
        })
        .catch(() => {});
}

export function submitNote(
    e,
    type,
    reply,
    blogIdentifier,
    setNotes = null,
    setCounts = null
) {
    e.preventDefault();
    Axios({
        url: `${apiBaseUrl}/post/notes`,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            Meta: {
                Status: 200,
                msg: 'OK'
            },
            response: {
                counts: {
                    totalLikes: 3,
                    totalReblogs: 1
                },
                notes: [
                    {
                        type: type,
                        blog_name: 'hazom',
                        blog_url: 'https://hazom.com',
                        followed: true,
                        post_id: 2541652,
                        reblog_parent_blog_name: 'kholdbold',
                        reblog_parent_blog_url: 'https://kholdbold.com',
                        avatar: 'https://64.media.tumblr.com/5d65e6564325029026372d750047aca2/da25d5299e6bc43a-9a/s64x64u_c1/d33411435f6a25c6182f6d780030d659f917766b.jpg',
                        content: reply
                    }
                ]
            }
        }
    })
        .then(() => {
            getPostNotes(blogIdentifier, setNotes, setCounts);
        })
        .catch(() => {});
}
