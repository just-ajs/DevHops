using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace DevHopsGH
{
    public static class AppConstants
    {
        public static string jsonFilePath = @"C:\Users\jszychowska\source\DevHops\Mockup\data.json";
        public static string imageFolder = @"C:\Users\jszychowska\Dropbox\devhops\images\";
        public static string getWorkItemUrl = @"http://localhost:5296/api/WorkItems/";
        public static string sendUpdateUrl = @"http://localhost:5296/api/StatusUpdates";
    }
}
