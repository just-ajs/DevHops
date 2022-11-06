using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using Grasshopper.Kernel;
using Newtonsoft.Json;
using Rhino.Geometry;

namespace DevHopsGH.Components
{
    public class StartupData : GH_Component
    {
        /// <summary>
        /// Initializes a new instance of the StartupData class.
        /// </summary>
        public StartupData()
          : base("StartupData", "Start", "Description","DevHops", "Send")
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
        }

        /// <summary>
        /// This is the method that actually does the work.
        /// </summary>
        /// <param name="DA">The DA object is used to retrieve from inputs and store in outputs.</param>
        protected override void SolveInstance(IGH_DataAccess DA)
        {
            var boardConnector = new BoardConnector();
            List<Task> tasks = new List<Task>();
            List<string> jsons = new List<string>();
            // get jsons
            for (int i = 1; i < 11; i++)
            {
                var name = $"{AppSettings.databaseSetup}\\Data{i.ToString()}.json";
                jsons.Add(name);
                var streamReader = new StreamReader(name);
                var jsonFile = streamReader.ReadToEnd();
                var reponse = boardConnector.AddWorkItem(jsonFile);
                Task task = JsonConvert.DeserializeObject<Task>(reponse);
                tasks.Add(task);
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
                    var resourceName = assembly.GetManifestResourceNames().Single(n => n.EndsWith("Icon_green.png"));
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
            get { return new Guid("98BA0B39-3282-405D-9961-5BCB74AEFA44"); }
        }
    }
}