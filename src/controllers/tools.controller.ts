import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors';
import Tool from '../models/tool';

/**
 * Get all tools, or filter by tag
 */
async function getTools(req: Request, res: Response, next: NextFunction) {
  const tag = req.query.tag;

  const queryParams = tag ? { tags: { $all: tag } } : {};

  const query = Tool.find(queryParams);

  try {
    const tools = await query.exec();
    return res.json(tools);
  } catch (error) {
    return next(
      new HTTPError(500, error.message || 'Internal Server Error', {
        cause: error,
      })
    );
  }
}

/**
 * Create a new tool
 */
async function createTool(req: Request, res: Response, next: NextFunction) {
  const tool = new Tool(req.body);

  try {
    return res.json(await tool.save());
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new HTTPError(400, error.message || 'Bad Request', {
          cause: error,
          expose: true,
        })
      );
    }
    return next(
      new HTTPError(500, error.message || 'Internal Server Error', {
        cause: error,
      })
    );
  }
}

/**
 * Delete a tool by id
 */
async function deleteTool(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  const query = Tool.findByIdAndRemove(id);

  try {
    await query.exec();
    return res.json({});
  } catch (error) {
    if (error.name === 'CastError') {
      return next(
        new HTTPError(404, `tool ID ${id} was not found`, {
          cause: error,
          expose: true,
        })
      );
    }
    return next(
      new HTTPError(500, error.message || 'Internal Server Error', {
        cause: error,
      })
    );
  }
}

export { getTools, createTool, deleteTool };
