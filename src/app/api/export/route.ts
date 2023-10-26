
import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";

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
    fs.writeFileSync(`public/export/${filename}`, data);

    return true;

  } catch (err) {
    console.error(`Error while exporting : ${err}`);
    return false;

  }
}

export async function POST(request: NextRequest) {
  const { data, filename }: ExportJSONBodyProps = await request.json();

  const usableFilename = findAvailableFilename(filename);

  if (writeToFile(data, usableFilename)) {
    return NextResponse.redirect(`${process.env.WEBAPP_URL}/export/${usableFilename}`, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename=${usableFilename}`,
      }
    })
  } else {
    return NextResponse.json({ message: "Error while exporting" });
  }
}
