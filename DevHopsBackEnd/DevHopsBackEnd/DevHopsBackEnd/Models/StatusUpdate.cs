namespace DevHopsBackEnd.Models
{
    public class StatusUpdate
    {
        public string StatusUpdateId { get; set; }
        public DateTime UpdateTime { get; set; }
        public string Comment { get; set; }
        public WorkStatus Status { get; set; }

        public Image? Image { get; set; }

        public string WorkItemId { get; set; }

        public enum WorkStatus
        {
            Todo,
            Inprogress,
            Review,
            ChangeRequested,
            Done
        }

    }
}