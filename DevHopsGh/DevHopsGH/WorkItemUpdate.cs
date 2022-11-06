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
        public string statusUpdateId { get; set; }
        public DateTime updateTime { get; set; }
        public string comment { get; set; }
        public string status { get; set; }

        public string workitemId { get; set; }
    }

}
