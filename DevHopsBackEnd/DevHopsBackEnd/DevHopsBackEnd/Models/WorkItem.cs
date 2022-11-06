namespace DevHopsBackEnd.Models
{
    public class WorkItem
    {
        public string WorkItemId { get; set; }
        public string Title { get; set; }
        public string Assignee { get; set; }
        public  List <StatusUpdate> StatusUpdates { get; set; }
        
        
    }
}