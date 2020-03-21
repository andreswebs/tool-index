# Tools Index
A simple repository to manage information about tools

## Version: 0.0.1

### /tools

#### GET
##### Description:

Get a list of all tools, or a list of tools by a tag specified in the tag query parameter.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tag | query | Tag used to filter tools. | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful response. | [toolList](#toollist) |
| 500 | Server error. | [error](#error) |

#### POST
##### Description:

Add a new tool.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tool | body | The new tool data | Yes | [newTool](#newtool) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful response | [registeredTool](#registeredtool) |
| 400 | Bad request | [error](#error) |
| 500 | Server error | [error](#error) |

### /tools/{id}

#### DELETE
##### Description:

Remove a tool by id.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Tool ID | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful response |  |
| 404 | Not found | [error](#error) |
| 500 | Server error | [error](#error) |

### Models


#### toolList

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| tools | [ object ] | A list of all tools | No |

#### registeredTool

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string | A unique ID for a tool | Yes |
| allOf | [newTool](#newtool) |  | No |

#### newTool

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string | Name of the tool | Yes |
| link | string | A link to the tool\'s website or repository | No |
| description | string | A brief description of the tool | No |
| tags | [ string ] | A list of tag keywords that classify the tool | No |

#### error

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| error | string | A publishable error message for the client | Yes |