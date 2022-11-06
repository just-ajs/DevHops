using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevHopsGH
{
    internal class AppSettings
    {
        public static string databaseSetup = $"{Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.FullName}\\Sample data";
    }
}
