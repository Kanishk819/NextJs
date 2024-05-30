import { Message } from "@/models/User";

export interface Apiresponse {
    success : boolean;
    message : string;
    isAcceptingMessages ?: boolean
    messages ?: Array<Message>
}