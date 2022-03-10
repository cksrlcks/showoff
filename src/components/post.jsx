import React from "react";
import Zoom from "react-medium-image-zoom";
import moment from "moment";
import { RiGhostFill } from "react-icons/ri";

const Post = ({ post, user, deletePost }) => {
    const postedDate = moment(post.createdAt).format("YYYY.MM.DD");

    return (
        <div className="feed_item">
            {post.fileUrl && (
                <div
                    className="feed_photo"
                    style={{ backgroundImage: `url(${post.fileUrl})` }}
                >
                    <Zoom
                        overlayBgColorStart={"rgba(0,0,0,0.6)"}
                        overlayBgColorEnd={"rgba(0,0,0,0.6)"}
                        zoomMargin={10}
                        transitionDuration={0}
                    >
                        <div className="fake_frame">
                            <img
                                src={post.fileUrl}
                                alt={post.fileName}
                                width="100%"
                            />
                        </div>
                    </Zoom>
                </div>
            )}
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
                            onClick={deletePost}
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
