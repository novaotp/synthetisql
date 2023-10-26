
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

// Internal
import PostResponseProps, { PostRequestProps } from '@/types/export';

const EXPORT_DIR = "public/export";

export async function POST(request: NextRequest): Promise<NextResponse<PostResponseProps>> {
  let { data, filename: originalFilename, extension }: PostRequestProps = await request.json();

  try {
    if (!fs.existsSync(EXPORT_DIR)) {
      fs.mkdirSync(EXPORT_DIR, { recursive: true });
    }

    let filename: string = originalFilename;

    let i = 0;
    while (fs.existsSync(`${EXPORT_DIR}/${filename}.${extension}`)) {
      filename = `${originalFilename}-${++i}`;
    }

    fs.writeFileSync(`${EXPORT_DIR}/${filename}.${extension}`, data);

    return NextResponse.json({ file: `${filename}.${extension}`, message: "Exported successfully." });

  } catch (err) {
    console.error(`Error while exporting : ${err}`);

    return NextResponse.json({ file: undefined,  message: `Error while exporting : ${err}` });
    
  }
}
