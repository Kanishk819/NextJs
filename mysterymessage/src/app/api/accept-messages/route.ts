import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../models/User";
import { User } from "next-auth";


export async function POST(request : Request){
    await dbConnect()

    const session = await getServerSession(authOptions)

    const user:User = session?.user 
    // const user:User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
              success: false,
              message: "Not Authenticated",
            },
            { status: 401 }
          );
    }

    const userId = user._id;
    const {acceptMessages} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage : acceptMessages},
            {new : true}
        )
        if(!updatedUser){
            return Response.json(
                {
                  success: false,
                  message: "Failed to Update User Status to Accept Messages",
                },
                { status: 401 }
              );
        }

        return Response.json(
            {
              success: true,
              message: "Message acceptence status updated successfully",
              updatedUser 
            },
            { status: 200}
          );
    } catch (error) {
        console.log("Failed to Update User Status to Accept Messages")
        return Response.json(
            {
              success: false,
              message: "Failed to Update User Status to Accept Messages",
            },
            { status: 404 }
          );
    }
}


export async function GET(request : Request){
    await dbConnect()

    const session = await getServerSession(authOptions)

    const user:User = session?.user 
    // const user:User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
              success: false,
              message: "Not Authenticated",
            },
            { status: 401 }
          );
    }

    const userId = user._id;

    const foundUser = await UserModel.findById(userId);

    try {
        if(!foundUser){
            return Response.json(
                {
                  success: false,
                  message: "User Not Found",
                },
                { status: 401 }
              );
        }
    
        return Response.json(
            {
              success: true,
              isAcceptingMessages : foundUser.isAcceptingMessage
            },
            { status: 200 }
          );
    } catch (error) {
        console.error("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error in getting message accepting status",
      },
      { status: 500 }
    );
    }


}