using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using Grasshopper.Kernel;
using Newtonsoft.Json;
using Rhino.Geometry;

namespace DevHopsGH.Components
{
    public class GetAllWorkItems : GH_Component
    {
        /// <summary>
        /// Initializes a new instance of the GetAllWorkItems class.
        /// </summary>
        public GetAllWorkItems()
          : base("GetAllWorkItems", "GetItems", "Get all tasks from database", "DevHops", "Get")
        {
        }

        /// <summary>
        /// Registers all the input parameters for this component.
        /// </summary>
        protected override void RegisterInputParams(GH_Component.GH_InputParamManager pManager)
        {
        }

        /// <summary>
        /// Registers all the output parameters for this component.
        /// </summary>
        protected override void RegisterOutputParams(GH_Component.GH_OutputParamManager pManager)
        {
            pManager.AddTextParameter("Tasks IDs", "IDs", "IDs of all tasks from the database", GH_ParamAccess.list);
            pManager.AddTextParameter("Tasks Status", "Status", "IDs of all status from the database", GH_ParamAccess.list);

        }

        /// <summary>
        /// This is the method that actually does the work.
        /// </summary>
        /// <param name="DA">The DA object is used to retrieve from inputs and store in outputs.</param>
        protected override void SolveInstance(IGH_DataAccess DA)
        {
            var boardConnector = new BoardConnector();


            var items = boardConnector.GetAllWorkItems();
            List<Task> tasks = JsonConvert.DeserializeObject<List<Task>>(items);

            // update status
            for (int i = 0; i < tasks.Count; i++)
            {
                if (tasks[i].statusUpdates.Count > 0)
                {
                    //var localStatus = tasks[i].statusUpdates[0].status;
                    //tasks[i].status = localStatus;

                    var sortedStatuses = tasks[i].statusUpdates.OrderByDescending(x => x.updateTime).First();


                    tasks[i].status = sortedStatuses.status;
                }
            }

            var ids = tasks.Select(t => t.workItemId).ToList();
            var status = tasks.Select(t => t.status).ToList();


            DA.SetDataList(0, ids);
            DA.SetDataList(1, status);
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
            get { return new Guid("27A15FC6-D1EC-436A-B2F9-F5195A1776FA"); }
        }
    }
}