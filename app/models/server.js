const CosmosClient = require('@azure/cosmos').CosmosClient;

const endpoint = 'your_cosmos_db_endpoint';
const key = 'your_cosmos_db_key';
const databaseId = 'your_database_id';
const containerId = 'your_collection_id';

const client = new CosmosClient({ endpoint, key });

const database = await client.databases.createIfNotExists({ id: databaseId });
const container = await database.containers.createIfNotExists({ id: containerId });

const postToWatchlist = async (req, res) => {
  const { title, liked } = req.body;

  const item = {
    title,
    liked
  };

  const { resource: createdItem } = await container.items.create(item);

  res.status(201).json(createdItem);
};

module.exports = {
  postToWatchlist
};