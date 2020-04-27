using Newtonsoft.Json;
using System.Collections.Generic;

namespace Covid19DbMigration.OldDataModel
{
	public class QuestionAnswer_V1
	{
		public QuestionAnswer_V1()
		{
			Answers = new List<string>();
			Sources = new List<string>();
			Links = new List<string>();
			Tags = new List<string>();
		}

		[JsonProperty(PropertyName = "id")]
		public string Id { get; set; }
		[JsonProperty(PropertyName = "date")]
		public long Date { get; set; }
		[JsonProperty(PropertyName = "title")]
		public string Title { get; set; }
		[JsonProperty(PropertyName = "answers")]
		public List<string> Answers { get; set; }
		[JsonProperty(PropertyName = "sources")]
		public List<string> Sources { get; set; }
		[JsonProperty(PropertyName = "links")]
		public List<string> Links { get; set; }
		[JsonProperty(PropertyName = "tags")]
		public List<string> Tags { get; set; }
		[JsonProperty(PropertyName = "images")]
		public List<string> Images { get; set; }
		[JsonProperty(PropertyName = "answered")]
		public bool Answered { get; set; }
		[JsonProperty(PropertyName = "like")]
		public int Like { get; set; }
		[JsonProperty(PropertyName = "_ts")]
		public long TimeStamp { get; set; }
		[JsonProperty(PropertyName = "_attachments")]
		public string Attachments { get; set; }
	}
}
