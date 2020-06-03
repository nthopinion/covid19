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
        // The database we will create
        private Database database;
        private CosmosClient cosmosClient;

        static async Task Main(string[] args)
        {
            try
            {
                PrintCommands();
                Program p = new Program();
                var iConfig = GetIConfigurationRoot();

                _databaseSettings = iConfig.GetSection("DatabaseSettings").Get<CosmosConfig.DatabaseSettings>();
                _nthUserSettings = iConfig.GetSection("NthUserSettings").Get<CosmosConfig.NthUserSettings>();
                await p.InitializeDatabaseConnection();
                while (true)
                {
                    Console.Write("Enter command, then press ENTER: ");
                    string decision = Console.ReadLine();
                    switch (decision.ToLower())
                    {
                        case "1":
                            //await p.GetStartedUserDBsync();
                            break;
                        case "2":
                            await p.ExecuteCommand("");
                            break;
                        case "help":
                            Program.PrintCommands();
                            break;
                        case "3":
                            await p.ExecuteCommand("_Hindi");
                            break;
                        case "4":
                            await p.ExecuteCommand("_Chinese");
                            break;
                        case "5":
                            await p.ExecuteCommand("_Deutsch");
                            break;
                        case "6":
                            await p.ExecuteCommand("_Korean");
                            break;
                        case "exit":
                            return;
                        default:
                            Console.ForegroundColor = ConsoleColor.Red;
                            Console.WriteLine("Invalid command. Enter 'help' to show a list of commands.");
                            Console.ResetColor();
                            break;
                    }

                    Console.ResetColor();
                }
            }
            catch (CosmosException de)
            {
                Exception baseException = de.GetBaseException();
                Console.WriteLine("{0} error occurred: {1}", de.StatusCode, de);
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"An error occurred: {ex}");
                Console.ResetColor();
            }
            Console.ReadLine();
        }

        public async Task ExecuteCommand(string language)
        {
            var performMigration = true;
            var oldDataFromAzure = await this.GetLegacyData(language);
            var newDataModel = ConvertToNewModel(oldDataFromAzure);

            if (performMigration)
            {
                var newQuestionDataAfterUpdate = await MigrateData<Question>(newDataModel.Questions, _databaseSettings.TargetQuestionContainer + language, "/id");
                var newAnswerDataAfterUpdate = await MigrateData<Answer>(newDataModel.Answers, _databaseSettings.TargetAnswerContainer + language, "/questionId");

                Assert.True(newQuestionDataAfterUpdate.Count > 0);
                Assert.True(newAnswerDataAfterUpdate.Count > 0);

                //verify the contents of the containers.
                var newQuestionData = await GetNewData<Question>(_databaseSettings.TargetQuestionContainer + language);
                var newAnswerData = await GetNewData<Answer>(_databaseSettings.TargetAnswerContainer + language);

                Assert.True(newQuestionData.Count > 0);
                Assert.True(newAnswerData.Count > 0);
            }
        }

        private static void PrintCommands()
        {
            Console.ResetColor();
            Console.WriteLine();
            Console.WriteLine("Command  Description");
            Console.WriteLine("====================");
            Console.WriteLine("[1]      Migrate question database");
            Console.WriteLine("[2]      Migrate to English (Default)");
            Console.WriteLine("[3]      Migrate to Hindi");
            Console.WriteLine("[4]      Migrate to Chinese");
            Console.WriteLine("[5]      Migrate to Deutsch");
            Console.WriteLine("[6]      Migrate to Korean");
            Console.WriteLine("[help]   Show available commands");
            Console.WriteLine("[exit]   Exit the program");
            Console.WriteLine("-------------------------");
        }

        public async Task InitializeDatabaseConnection()
        {
            // Create a new instance of the Cosmos Client
            //this.cosmosClient = new CosmosClient(EndpointUri, PrimaryKey);
            this.cosmosClient = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey, new CosmosClientOptions()
            {
                ConnectionMode = ConnectionMode.Gateway
            });
            await this.CreateDatabaseAsync();
        }


        /// <summary>
        /// Create the database if it does not exist
        /// </summary>
        private async Task CreateDatabaseAsync()
        {
            // Create a new database
            this.database = await this.cosmosClient.CreateDatabaseIfNotExistsAsync(_databaseSettings.Database);
            Console.WriteLine("Created Database: {0}\n", _databaseSettings.Database);
        }

        public async Task<List<QuestionAnswer_V1>> GetLegacyData(string language)
        {
            var modelList = new List<QuestionAnswer_V1>();
            //CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            //Database database = client.GetDatabase(_databaseSettings.Database);
            Container container = this.database.GetContainer(_databaseSettings.SourceContainer + language);
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

        public  async Task<List<T>> GetNewData<T>(string targetContainer) where T : IQuestionAnswerItem
        {
            var modelList = new List<T>();
            //CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            //Database database = client.GetDatabase(_databaseSettings.Database);
            Container container = this.database.GetContainer(targetContainer);
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

        private async Task<List<T>> MigrateData<T>(List<T> newModel, string targetContainer, string partitionKey) where T : IQuestionAnswerItem
        {
            //CosmosClient client = new CosmosClient(_databaseSettings.Endpoint, _databaseSettings.AuthKey);
            //Database database = client.GetDatabase(_databaseSettings.Database);
            await DeleteContainerData<T>(targetContainer);

            Container container = await this.database.CreateContainerIfNotExistsAsync(targetContainer, partitionKey);
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
                    Date = questionAnswer.TimeStamp,
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
