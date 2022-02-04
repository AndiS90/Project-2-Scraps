import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <div class="commentList">
    <div class="commentTitle">
      <h3
        className=""
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      </div>

<div class="row ">
  <div class="col s12 ">

        {comments &&
          comments.map((comment) => (

    <div class="card commentCard  ">
      <div style={{ borderBottom: '1px dotted #1a1a1a' }} class=" card-content ">
            <div class="commentText" key={comment._id} className=" ">     
             <p style={{ fontSize: '1.825rem' }} className="card-body">{comment.commentText}</p>
              </div>  
           
            </div>   
             <h5  className=" right-align">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
        </div>
          
          ))}
       </div>
            </div>
    </div>
  );
};

export default CommentList;