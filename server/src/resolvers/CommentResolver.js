import { v4 as uuidv4 } from 'uuid';

export const rootCommentMutation = {
  addComment(_, { commentDetails }, { db, pubsub }) {
    const comment = {
      ...commentDetails,
      approved: commentDetails.approved || false,
      id: uuidv4()
    };

    db.comments.push(comment);

    pubsub.publish('COMMENT_ADDED', { commentAdded: comment });

    return comment;
  },

  updateComment(_, { id, commentDetails }, { db }) {
    const currentCommentId = db.comments.findIndex(comment => comment.id === id);
    const currentComment = db.comments[currentCommentId];

    const updatedComment = {
      ...currentComment,
      ...commentDetails
    }

    db.comments[currentCommentId] = updatedComment;

    return updatedComment;
  }
};