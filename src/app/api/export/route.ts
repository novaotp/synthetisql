
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

const EXPORT_DIR = "public/export";

interface PostRequestProps {
  /** The data to store. */
  data: string,
  /**
   * The filename to use, or a derived one if it already exists.
   * 
   * Automatically adds the `.json` extension.
   */
  filename: string,
}

interface PostResponseProps {
  /** The filename of the generated file or `undefined`. */
  filename: string | undefined,
  /** A message. */
  message: string,
}

export async function POST(request: NextRequest): Promise<NextResponse<PostResponseProps>> {
  let { data, filename: originalFilename }: PostRequestProps = await request.json();

  try {
    if (!fs.existsSync(EXPORT_DIR)) {
      fs.mkdirSync(EXPORT_DIR, { recursive: true });
    }

    let filename: string = originalFilename;

    let i = 0;
    while (fs.existsSync(`${EXPORT_DIR}/${filename}.json`)) {
      filename = `${originalFilename}-${++i}`;
    }

    fs.writeFileSync(`${EXPORT_DIR}/${filename}.json`, data);

    return NextResponse.json({ filename: `${filename}.json`, message: "Exported successfully." });

  } catch (err) {
    console.error(`Error while exporting : ${err}`);

    return NextResponse.json({ filename: undefined,  message: `Error while exporting : ${err}` });
    
  }
}
