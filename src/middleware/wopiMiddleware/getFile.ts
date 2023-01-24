import { NextFunction, Request, Response } from 'express';
import { existsSync } from 'fs';
import { chmod, readFile } from 'fs/promises';
import { fileInfo } from '../../utils';

export async function getFile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { file_id: fileId } = req.params;
    const filePath = await fileInfo.getFilePath(fileId);

    if (existsSync(filePath)) {
      await chmod(filePath, 0o777);
      const file = await readFile(filePath);

      if (fileInfo?.info?.Version) {
        res.setHeader('X-WOPI-ItemVersion', fileInfo.info.Version);
      }

      res.status(200).send(file);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error((err as Error)?.message || err);

    res.sendStatus(500);
  }
}
