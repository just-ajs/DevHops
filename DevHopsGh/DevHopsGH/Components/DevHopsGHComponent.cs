using Grasshopper;
using Grasshopper.Kernel;
using Rhino.Geometry;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Resources;
using System.Runtime.Remoting.Messaging;
using Grasshopper.Kernel.Types;
using Newtonsoft.Json;

namespace DevHopsGH
{
    public class DevHopsGHComponent : GH_Component
    {
        /// <summary>
        /// Each implementation of GH_Component must provide a public 
        /// constructor without any arguments.
        /// Category represents the Tab in which the component will appear, 
        /// Subcategory the panel. If you use non-existing tab or panel names, 
        /// new tabs/panels will automatically be created.
        /// </summary>
        public DevHopsGHComponent()
          : base("DevHopsGH", "DevHops", "Connector of Grasshopper to Kanban board",
            "DevHops", "DevHops")
        {
        }

        /// <summary>
        /// Registers all the input parameters for this component.
        /// </summary>
        protected override void RegisterInputParams(GH_Component.GH_InputParamManager pManager)
        {
            // Use the pManager object to register your input parameters.
            pManager.AddTextParameter("Task ID", "ID", "Kanban board id task", GH_ParamAccess.item);
        }

        /// <summary>
        /// Registers all the output parameters for this component.
        /// </summary>
        protected override void RegisterOutputParams(GH_Component.GH_OutputParamManager pManager)
        {
            // Use the pManager object to register your output parameters.
            // Output parameters do not have default values, but they too must have the correct access type.
            pManager.AddTextParameter("Task Status", "Status", "Task status", GH_ParamAccess.item);
            pManager.AddTextParameter("Comments", "Comments", "Task comments", GH_ParamAccess.item);
        }

        /// <summary>
        /// This is the method that actually does the work.
        /// </summary>
        /// <param name="DA">The DA object can be used to retrieve data from input parameters and 
        /// to store data in output parameters.</param>
        protected override void SolveInstance(IGH_DataAccess DA)
        {
            // First, we need to retrieve all data from the input parameters.
            // We'll start by declaring variables and assigning them starting values.
            string id = String.Empty;

            // Then we need to access the input parameters individually. 
            // When data cannot be extracted from a parameter, we should abort this method.
            if (!DA.GetData(0, ref id)) return;


            // We should now validate the data and warn the user if invalid data is supplied.
            if (id.Length < 1)
            {
                AddRuntimeMessage(GH_RuntimeMessageLevel.Error, "Not a valid task id");
                return;
            }

            // read json
            var jsonFilePath = AppConstants.jsonFilePath;
            var streamReader = new StreamReader(jsonFilePath);
            var jsonFile = streamReader.ReadToEnd();



            List<Task> tasks = JsonConvert.DeserializeObject<List<Task>>(jsonFile);
            // find id

            Task task = tasks.Find(t => t.workItemId == id);
            // return status



            // return comments
            string status = task != null ? task.status.ToString() : "empty";

            var lastComment = task.statusUpdates[task.statusUpdates.Count - 1].comment;
            //List<string> comments = task != null ? task.comments : new List<string> {"no comments"};

            var b = new BoardConnector();
           // var response = b.GetWorkItemById(id);


            // Finally assign the spiral to the output parameter.
            DA.SetData(0, status);
            DA.SetData(1, lastComment);
        }



        /// <summary>
        /// The Exposure property controls where in the panel a component icon 
        /// will appear. There are seven possible locations (primary to septenary), 
        /// each of which can be combined with the GH_Exposure.obscure flag, which 
        /// ensures the component will only be visible on panel dropdowns.
        /// </summary>
        public override GH_Exposure Exposure => GH_Exposure.primary;

        /// <summary>
        /// Provides an Icon for every component that will be visible in the User Interface.
        /// Icons need to be 24x24 pixels.
        /// You can add image files to your project resources and access them like this:
        /// return Resources.IconForThisComponent;
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
        /// Each component must have a unique Guid to identify it. 
        /// It is vital this Guid doesn't change otherwise old ghx files 
        /// that use the old ID will partially fail during loading.
        /// </summary>
        public override Guid ComponentGuid => new Guid("660578A5-065F-471F-8AF4-9674FE9E17B1");
    }
}