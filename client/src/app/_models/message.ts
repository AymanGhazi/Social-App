export interface Message {
        id: number;
        senderId: number;
        senderUserName: string;
        senderPhotoUrl: string;
        recipientId: number;
        recipientUserName: string;
        recipientPhotoUrl?: any;
        content: string;
        dateRead?: Date;
        messageSent: Date;
}
