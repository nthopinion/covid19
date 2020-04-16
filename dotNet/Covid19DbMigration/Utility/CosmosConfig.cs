namespace Covid19DbMigration.Utility
{
    public class CosmosConfig
    {
        public class DatabaseSettings
        {
            public DatabaseSettings()
            {

            }

            public string Endpoint { get; set; }
            public string AuthKey { get; set; }
            public string Database { get; set; }
            public string SourceContainer { get; set; }
            public string TargetQuestionContainer { get; set; }
            public string TargetAnswerContainer { get; set; }
        }

        public class NthUserSettings
        {
            public NthUserSettings()
            {

            }

            public string LoginId { get; set; }
            public string Name { get; set; }
        }
    }
}
