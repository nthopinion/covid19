using System.Collections.Generic;

namespace Covid19DbMigration.NewDataModel
{
	public class QuestionAnswerCollection
	{
		public QuestionAnswerCollection()
		{
			Questions = new List<Question>();
			Answers = new List<Answer>();
		}

		public List<Question> Questions { get; set; }
		public List<Answer> Answers { get; set; }
	}
}
