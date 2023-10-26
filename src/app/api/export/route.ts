
import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

const DEFAULT_FILENAME = "db";

interface ExportJSONBodyProps {
  /** The data to store in the file. */
  data: any;
  /** The name of the file in whch the data will be stored. */
  filename: string,
}

/**
 * Finds an available filename (adds numbers until it succeeds) and returns it.
 * @param filename The default filename to use.
 */
const findAvailableFilename = (filename: string): string => {
  filename = `${DEFAULT_FILENAME}.json`;

  let i = 0;
  while (fs.existsSync(`./public/export/${filename}`)) {
    filename = `${DEFAULT_FILENAME}-${++i}.json`;
  }

  return filename;
}

/**
 * Write data to a file and returns true if it succeeded, false otherwise.
 * @param data The data to write to the file
 * @param filename The name of the file in whch the data will be stored
 */
const writeToFile = (data: string, filename: string): boolean => {
  try {
    fs.writeFileSync(`./public/export/${filename}`, data);

    return true;

  } catch (err) {
    console.error(`Error while exporting : ${err}`);
    return false;

  }
}

export function POST(req: NextApiRequest, res: NextApiResponse) {
  const { data, filename }: ExportJSONBodyProps = JSON.parse(req.body);

  const usableFilename = findAvailableFilename(filename);

  if (writeToFile(data, usableFilename)) {
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(`${process.env.WEBAPP_URL}/public/export/${filename}`);
  } else {
    res.status(500).json({ success: false });
  }
}
