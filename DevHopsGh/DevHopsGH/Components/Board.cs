using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Grasshopper.Kernel;
using Rhino.Geometry;

namespace DevHopsGH.Components
{
    public class Board : GH_Component
    {
        /// <summary>
        /// Initializes a new instance of the Board class.
        /// </summary>
        public Board()
          : base("Open Board", "Board",
              "Description",
              "DevHops", "Board")
        {
        }

        /// <summary>
        /// Registers all the input parameters for this component.
        /// </summary>
        protected override void RegisterInputParams(GH_Component.GH_InputParamManager pManager)
        {
            pManager.AddBooleanParameter("Open board!", "Board", "Open kanban board", GH_ParamAccess.item);

        }

        /// <summary>
        /// Registers all the output parameters for this component.
        /// </summary>
        protected override void RegisterOutputParams(GH_Component.GH_OutputParamManager pManager)
        {
        }

        /// <summary>
        /// This is the method that actually does the work.
        /// </summary>
        /// <param name="DA">The DA object is used to retrieve from inputs and store in outputs.</param>
        protected override void SolveInstance(IGH_DataAccess DA)
        {
            bool open = false;

            // Then we need to access the input parameters individually. 
            // When data cannot be extracted from a parameter, we should abort this method.
            if (!DA.GetData(0, ref open)) return;

            if (open)
            {
                System.Diagnostics.Process.Start(AppConstants.frontEndServer);
            }

        }

        /// <summary>
        /// Provides an Icon for the component.
        /// </summary>
        protected override System.Drawing.Bitmap Icon
        {
            get
            {
                var assembly = System.Reflection.Assembly.GetExecutingAssembly();
                {
                    var resourceName = assembly.GetManifestResourceNames().Single(n => n.EndsWith("Icon_transparent.png"));
                    var stream = assembly.GetManifestResourceStream(resourceName);
                    if (stream != null) return new Bitmap(stream);
                }
                return null;
            }
        }

        /// <summary>
        /// Gets the unique ID for this component. Do not change this ID after release.
        /// </summary>
        public override Guid ComponentGuid
        {
            get { return new Guid("E0D680C7-958D-4189-8EE5-E720177582DD"); }
        }
    }
}