using Newtonsoft.Json;
using System.Collections.Generic;

namespace Covid19DbMigration.NewDataModel
{
    public class Answer : IQuestionAnswerItem
    {
        public Answer()
        {
            Sources = new List<string>();
            Attachments = new List<string>();
            Tags = new List<string>();
        }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "questionId")]
        public string QuestionId { get; set; }
        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }
        [JsonProperty(PropertyName = "sources")]
        public List<string> Sources { get; set; }
        [JsonProperty(PropertyName = "attachments")]
        public List<string> Attachments { get; set; }
        [JsonProperty(PropertyName = "tags")]
        public List<string> Tags { get; set; }
        [JsonProperty(PropertyName = "firstAnsweredOn")]
        public long FirstAnsweredOn { get; set; }
        [JsonProperty(PropertyName = "firstAnsweredBy")]
        public AnsweredBy FirstAnsweredBy { get; set; }
        [JsonProperty(PropertyName = "lastAnsweredOn")]
        public long LastAnsweredOn { get; set; }
        [JsonProperty(PropertyName = "lastAnsweredBy")]
        public AnsweredBy LastAnsweredBy { get; set; }
        [JsonProperty(PropertyName = "deleted")]
        public bool Deleted { get; set; }
        [JsonProperty(PropertyName = "like")]
        public int Like { get; set; }
        [JsonProperty(PropertyName = "flag")]
        public int Flag { get; set; }

        public class AnsweredBy
        {
            [JsonProperty(PropertyName = "name")]
            public string Name { get; set; }
            [JsonProperty(PropertyName = "loginId")]
            public string LoginId { get; set; }
        }
    }
}
