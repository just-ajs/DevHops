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
        public string id { get; set; }

        public string title { get; set; }

        public string username { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Status status { get; set; }

        public List<string> comments { get; set; }

        public List<string> images { get; set; }

    }

    public enum Status
    {
        Todo,
        Inprogress, 
        Review,
        ChangeRequested,
        Done
    }
}
