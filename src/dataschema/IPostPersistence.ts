export interface IPostPersistence {
  _id: string;
  userId: string;
  content: string;
  tags: string[];
  reactions: [
    {
      userId: string;
      reactionType: string;
    },
  ];
  comments: [
    {
      userId: string;
      content: string;
      tags: string[];
    },
  ];
}
