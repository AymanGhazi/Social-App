namespace API.Helpers
{
    public class UserParams : paginationParams
    {

        public string currentUserName { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 150;

        public string orderBy { get; set; } = "lastActive";

    }
}