# Steps to run and update Algolia Index

1. Replace the API_KEY value with the Admin API Key from algolia in the file algolia.env file
   1. the API_KEY is the one with the addObject, editSettings, deleteIndex ACLs.  
2. Install [jq](https://stedolan.github.io/jq/download/)
3. From the root directory of this repo run:

```bash
   docker run -it --env-file=./algolia.env -e "CONFIG=$(cat ./algolia.config.json | jq -r tostring)" algolia/docsearch-scraper
```
