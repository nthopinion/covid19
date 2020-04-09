using Newtonsoft.Json;
using System.Collections.Generic;

namespace Covid19DbMigration.NewDataModel
{
	public class Question: IQuestionAnswerItem
	{
		public Question()
		{
			Answers = new List<string>();
		}

		[JsonProperty(PropertyName = "id")]
		public string Id { get; set; }
		[JsonProperty(PropertyName = "date")]
		public long Date { get; set; }
		[JsonProperty(PropertyName = "title")]
		public string Title { get; set; }
		[JsonProperty(PropertyName = "answers")]
		public List<string> Answers { get; set; }
		[JsonProperty(PropertyName = "answered")]
		public bool Answered { get; set; }
		[JsonProperty(PropertyName = "like")]
		public int Like { get; set; }
	}
}
