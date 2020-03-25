/**
 * Sort questions.
 * The requirement is such that the first 2 questions will be the highest liked and then we will show the questions that were created recently.
 *
 * @param {array} questions
 */
export const sortQuestions = (questions) => {
  // Sort questions by likes and get the top 2.
  const mostLikedQuestions = questions
    .sort((a, b) => {
      const likesA = a.like || 0;
      const likesB = b.like || 0;

      return likesB - likesA;
    })
    .slice(0, 2);

  // Sort questions by date
  const recentQuestions = questions.slice(2).sort((a, b) => {
    return b.date - a.date;
  });

  return [...mostLikedQuestions, ...recentQuestions];
};
