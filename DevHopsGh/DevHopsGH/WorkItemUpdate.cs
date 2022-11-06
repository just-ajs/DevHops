using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace DevHopsGH
{
    public class WorkItemUpdate
    {
        public string workitemId { get; set; }
        public string timestamp { get; set; }
        public string username { get; set; }
        public string comment { get; set; }
        public Status status { get; set; }
        public string image { get; set; }
    }
}
