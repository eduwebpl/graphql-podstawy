import { withFilter } from 'graphql-yoga';

export const commentSubscriptions = {
  commentAdded: {
    subscribe: withFilter(
      (_, args, { pubsub }) => pubsub.asyncIterator('COMMENT_ADDED'),
      (payload, variables) => {
        return payload.commentAdded.bookId === variables.bookId;
      },
    ),
  }
}
