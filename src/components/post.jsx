import React from "react";
import Zoom from "react-medium-image-zoom";
import moment from "moment";
import { RiGhostFill } from "react-icons/ri";

const Post = ({ post, user, handleDelete }) => {
    const postedDate = moment(post.createdAt).format("YYYY.MM.DD");
    const onDelete = () => {
        handleDelete(post.id);
    };
    return (
        <div className="feed_item">
            {/* <div className="feed_photo">
                <Zoom
                    overlayBgColorStart={"rgba(0,0,0,0.6)"}
                    overlayBgColorEnd={"rgba(0,0,0,0.6)"}
                    zoomMargin={10}
                    transitionDuration={0}
                >
                    <img
                        src="https://images.unsplash.com/photo-1639405137370-5ab16e0cd9fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                        alt=""
                        width="100%"
                    />
                </Zoom>
            </div> */}
            <div className="feed_content">
                <pre>{post.content}</pre>
            </div>
            <div className="feed_meta">
                <div className="user_name">
                    <RiGhostFill />
                    {post.userName}
                </div>
                <div className="meta">
                    {user && user.uid === post.userId && (
                        <button
                            type="button"
                            className="delete"
                            onClick={onDelete}
                        >
                            삭제
                        </button>
                    )}
                    <div className="date">{postedDate}</div>
                </div>
            </div>
        </div>
    );
};

export default Post;
