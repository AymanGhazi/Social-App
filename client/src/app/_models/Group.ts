export interface Group {
    name:string;
    connections:connection[]
}
interface connection{
    ConnectionId:string;
    username:string;
}
