using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Covid19DbMigration.NewDataModel;
using Covid19DbMigration.OldDataModel;
using Covid19DbMigration.Utility;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace Covid19DbMigration
{
    /// <summary>
    /// Test / Sandbox project for migrating Azure Cosmos data
    /// </summary>
    public class Program
    {
        private static CosmosConfig.DatabaseSettings _databaseSettings;
        private static CosmosConfig.NthUserSettings _nthUserSettings;

        static async Task Main(string[] args)
        {
            var iConfig = GetIConfigurationRoot();
            var performMigration = false;

            _databaseSettings = iConfig.GetSection("DatabaseSettings").Get<CosmosConfig.DatabaseSettings>();
            _nthUserSettings = iConfig.GetSection("NthUserSettings").Get<CosmosConfig.NthUserSettings>();

            var oldDataFromAzure = await GetLegacyData();
            var newDataModel = ConvertToNewModel(oldDataFromAzure);

            if (performMigration)
            {
                var newQuestionDataAfterUpdate = await MigrateData<Question>(newDataModel.Questions, _databaseSettings.TargetQuestionContainer, "/id");
                var newAnswerDataAfterUpdate = await MigrateData<Answer>(newDataModel.Answers, _databaseSettings.TargetAnswerContainer, "/questionId");

                Assert.True(newQuestionDataAfterUpdate.Count > 0);
                Assert.True(newAnswerDataAfterUpdate.Count > 0);

                //verify the contents of the containers.
                var newQuestionData = await GetNewData<Question>(_databaseSettings.TargetQuestionContainer);
                var newAnswerData = await GetNewData<Answer>(_databaseSettings.TargetAnswerContainer);

                Assert.True(newQuestionData.Count > 0);
                Assert.True(newAnswerData.Count > 0);
            }
        }

        public static async Task<List<QuestionAnswer_V1>> GetLegacyData()
        {
            var modelList = new List<QuestionAnswer_V1>();
            CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            Database database = client.GetDatabase(_databaseSettings.Database);
            Container container = database.GetContainer(_databaseSettings.SourceContainer);
            FeedIterator<QuestionAnswer_V1> feedIterator = container.GetItemQueryIterator<QuestionAnswer_V1>(
                "Select * from c");

            while (feedIterator.HasMoreResults)
            {
                FeedResponse<QuestionAnswer_V1> response = await feedIterator.ReadNextAsync();
                foreach (var item in response)
                {
                    modelList.Add(item);
                }
            }

            return modelList;
        }

        public static async Task<List<T>> GetNewData<T>(string targetContainer) where T : IQuestionAnswerItem
        {
            var modelList = new List<T>();
            CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            Database database = client.GetDatabase(_databaseSettings.Database);
            Container container = database.GetContainer(targetContainer);
            FeedIterator<T> feedIterator = container.GetItemQueryIterator<T>(
                "Select * from c");

            while (feedIterator.HasMoreResults)
            {
                FeedResponse<T> response = await feedIterator.ReadNextAsync();
                foreach (var item in response)
                {
                    modelList.Add(item);
                }
            }

            return modelList;
        }

        private static async Task<List<T>> MigrateData<T>(List<T> newModel, string targetContainer, string partitionKey) where T : IQuestionAnswerItem
        {
            CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            Database database = client.GetDatabase(_databaseSettings.Database);
            await DeleteContainerData<T>(targetContainer);

            Container container = await database.CreateContainerIfNotExistsAsync(targetContainer, partitionKey);
            List<T> result = new List<T>();

            foreach (var question in newModel)
            {
                ItemResponse<T> createResponse = await container.CreateItemAsync(question);
                result.Add(createResponse.Resource);
            }

            return result;
        }

        private static async Task DeleteContainerData<T>(string containerName) where T : IQuestionAnswerItem
        {
            CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            Database database = client.GetDatabase(_databaseSettings.Database);

            Container container = database.GetContainer(containerName);

            try
            {
                var response = await container.DeleteContainerAsync();
            }
            catch (CosmosException ex)
            {
                if (ex.StatusCode != System.Net.HttpStatusCode.NotFound)
                {
                    //404 is acceptable as it just means the container did not already exist.
                    throw ex;
                }
            }

        }

        public static QuestionAnswerCollection ConvertToNewModel(List<QuestionAnswer_V1> legacyModel)
        {
            var questionsAndAnswers = new QuestionAnswerCollection();

            foreach (var questionAnswer in legacyModel)
            {
                var question = new Question()
                {
                    Id = questionAnswer.Id,
                    Date = questionAnswer.Date,
                    Title = questionAnswer.Title,
                    Answered = questionAnswer.Answered,
                    Like = questionAnswer.Like,
                };

                if (questionAnswer.Answers != null)
                {
                    questionAnswer.Answers.ForEach(legacyAnswer =>
                    {
                        var answerId = Guid.NewGuid().ToString();

                        questionsAndAnswers.Answers.Add(new Answer()
                        {
                            Id = answerId,
                            QuestionId = questionAnswer.Id,
                            Attachments = new List<string>(),
                            Deleted = false,
                            FirstAnsweredBy = new Answer.AnsweredBy() { LoginId = _nthUserSettings.LoginId, Name = _nthUserSettings.Name },
                            FirstAnsweredOn = questionAnswer.TimeStamp,
                            LastAnsweredBy = new Answer.AnsweredBy() { LoginId = _nthUserSettings.LoginId, Name = _nthUserSettings.Name },
                            LastAnsweredOn = questionAnswer.TimeStamp,
                            Like = 0,
                            Flag = 0,
                            Sources = MapSourcesAndLinks(questionAnswer.Sources, questionAnswer.Links),
                            Tags = questionAnswer.Tags ?? new List<string>(),
                            Text = legacyAnswer,
                        });

                        question.Answers.Add(answerId);
                    });
                }

                questionsAndAnswers.Questions.Add(question);
            }
            return questionsAndAnswers;
        }

        private static List<string> MapSourcesAndLinks(List<string> sources, List<string> links)
        {
            if (sources != null)
            {
                return sources.Concat(links ?? new List<string>()).ToList();
            }
            return links ?? new List<string>();
        }

        private static async Task PostTestQuestion(string text)
        {
            CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            Database database = client.GetDatabase(_databaseSettings.Database);
            Container containerQuestion = database.GetContainer(_databaseSettings.TargetQuestionContainer);

            var testQuestion = new Question()
            {
                Id = Guid.NewGuid().ToString(),
                Title = text,
                Date = 1584385351,
                Answered = false,
                Answers = new List<string>(),
                Like = 0,
            };

            ItemResponse<Question> responseFromQuestionInsert = await containerQuestion.CreateItemAsync(testQuestion);
            Assert.NotNull(responseFromQuestionInsert.Resource);
        }

        private static async Task PostTestAnswer(string text, string questionId)
        {
            CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            Database database = client.GetDatabase(_databaseSettings.Database);
            Container containerAnswer = database.GetContainer(_databaseSettings.TargetAnswerContainer);

            //Add answer
            var testAnswer = new Answer()
            {
                Id = Guid.NewGuid().ToString(),
                QuestionId = questionId,
                Text = text,
                Sources = new List<string>(),
                Attachments = new List<string>(),
                Tags = new List<string>(),
                FirstAnsweredOn = 1584385351,
                FirstAnsweredBy = new Answer.AnsweredBy() { LoginId = _nthUserSettings.LoginId, Name = _nthUserSettings.Name },
                LastAnsweredOn = 1584385351,
                LastAnsweredBy = new Answer.AnsweredBy() { LoginId = _nthUserSettings.LoginId, Name = _nthUserSettings.Name },
                Deleted = false,
                Like = 0
            };

            ItemResponse<Answer> responseFromAnswerInsert = await containerAnswer.CreateItemAsync(testAnswer);
            Assert.NotNull(responseFromAnswerInsert.Resource);

            //Get question
            Question question = null;
            Container containerQuestion = database.GetContainer(_databaseSettings.TargetQuestionContainer);
            FeedIterator<Question> feedIterator = containerQuestion.GetItemQueryIterator<Question>(
                $"select * from c where c.id = '{questionId}'");

            while (feedIterator.HasMoreResults)
            {
                FeedResponse<Question> response = await feedIterator.ReadNextAsync();
                foreach (var item in response)
                {
                    question = item;
                }
            }

            //Add answer id to question.Answers
            question.Answers.Add(testAnswer.Id);
            ItemResponse<Question> responseFromQuestionUpdate = await containerQuestion.UpsertItemAsync(question);
            Assert.NotNull(responseFromQuestionUpdate.Resource);
        }

        public static IConfiguration GetIConfigurationRoot()
        {
            return new ConfigurationBuilder()
                .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
        }
    }
}
