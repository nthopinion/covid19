/**
 * Sort questions by date.
 *
 * @param {array} questions
 */
export const sortQuestionsByDate = questions => {
  return questions.sort((a, b) => {
    return b.date - a.date;
  });
};
