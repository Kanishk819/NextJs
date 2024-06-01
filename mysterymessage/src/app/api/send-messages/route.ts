import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../models/User";
import { Message } from "../../../models/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    //is user accepting messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User Not Accepting Messages",
        },
        { status: 401 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.message.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message Sent Successfully",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error Adding Messages", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
