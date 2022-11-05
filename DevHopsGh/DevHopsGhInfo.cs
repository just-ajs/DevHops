using Grasshopper;
using Grasshopper.Kernel;
using System;
using System.Drawing;

namespace DevHopsGh
{
    public class DevHopsGhInfo : GH_AssemblyInfo
    {
        public override string Name => "DevHopsGh";

        //Return a 24x24 pixel bitmap to represent this GHA library.
        public override Bitmap Icon => null;

        //Return a short string describing the purpose of this GHA library.
        public override string Description => "";

        public override Guid Id => new Guid("C428A30A-61EC-4656-811B-03476437DFEE");

        //Return a string identifying you or your company.
        public override string AuthorName => "";

        //Return a string representing your preferred contact details.
        public override string AuthorContact => "";
    }
}