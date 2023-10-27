
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

// Internal
import PostResponseProps, { DeleteRequestProps, PostRequestProps } from '@/types/export';

export async function POST(request: NextRequest): Promise<NextResponse<PostResponseProps>> {
  let { path, data, filename }: PostRequestProps = await request.json();
  const [name, extension] = filename.split('.');

  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    let i = 0;
    while (true) {
      if (!fs.existsSync(`${path}/${filename}`)) {
        break;
      }

      filename = `${name}-${++i}.${extension}`;
    }

    fs.writeFileSync(`${path}/${filename}`, data);

    return NextResponse.json({ filename, message: "Exported successfully." });

  } catch (err) {
    console.error(`Error while exporting : ${err}`);

    return NextResponse.json({ filename: undefined,  message: `Error while exporting : ${err}` });
    
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  let { path, filename }: DeleteRequestProps = await request.json();

  try {
    if (fs.existsSync(`${path}/${filename}`)) {
      fs.unlinkSync(`${path}/${filename}`);
    }

    return NextResponse.json("Deleted file successfully.");

  } catch (err) {
    console.error(`Error while exporting : ${err}`);

    return NextResponse.json(`Error while exporting : ${err}`);
    
  }
}
