using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Rhino.Input;

namespace DevHopsGH
{
    public class Task
    {
        public string workItemId { get; set; }

        public string title { get; set; }
        public string description { get; set; }

        public string assignee { get; set; }

        public string status { get; set; }

        public List<StatusUpdate> statusUpdates { get; set; }
    }

    public enum Status
    {
        Todo,
        Inprogress, 
        Review,
        ChangeRequested,
        Done
    }

    public class StatusUpdate
    {
        public string comment { get; set; }
        public string status { get; set; }
    }
}
