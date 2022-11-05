using Grasshopper;
using Grasshopper.Kernel;
using System;
using System.Drawing;

namespace DevHopsGH
{
    public class DevHopsGHInfo : GH_AssemblyInfo
    {
        public override string Name => "DevHopsGH";

        //Return a 24x24 pixel bitmap to represent this GHA library.
        public override Bitmap Icon => null;

        //Return a short string describing the purpose of this GHA library.
        public override string Description => "";

        public override Guid Id => new Guid("0FD29E58-7724-4B7D-99C4-16FD0E9FD470");

        //Return a string identifying you or your company.
        public override string AuthorName => "";

        //Return a string representing your preferred contact details.
        public override string AuthorContact => "";
    }
}