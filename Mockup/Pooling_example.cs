using System;
using System.ComponentModel;
using System.Threading;



namespace DevHops
{
    public class QueryJob : GH_Component
    {
        private readonly SynchronizationContext _context;
        //What you are checking against 
        DateTime LastUpdate = new DateTime(2000,01,01,01,15,00);
        private string WorkItemId; 
        public bool completed = false;
        

        BackgroundWorker tracker;



        /// <summary>
        /// Initializes a new instance of the Job_Querry_new class.
        /// </summary>
        public QueryJob()
          : base("Query Job", "QJ",
              "Checks if status has changed.",
              "DevHops", "DevHops")
        {
            _context = SynchronizationContext.Current;
           
        }

        /// <summary>
        /// Registers all the input parameters for this component.
        /// </summary>
        protected override void RegisterInputParams(GH_Component.GH_InputParamManager pManager)
        {
           //inputs
        }

        /// <summary>
        /// Registers all the output parameters for this component.
        /// </summary>
        protected override void RegisterOutputParams(GH_Component.GH_OutputParamManager pManager)
        {
           //
        }

        /// <summary>
        /// This is the method that actually does the work.
        /// </summary>
        /// <param name="DA">The DA object is used to retrieve from inputs and store in outputs.</param>
        protected override void SolveInstance(IGH_DataAccess DA)
        {
            string _WorkItemId = ""; 

            if (!DA.GetData(0, ref _WorkItemId)) return;

            if (WorkItemId == null)
                return;

            if (!_WorkItemId.Equals(WorkItemId))
            {
                WorkItemId = _WorkItemId;
                completed = false;
            }

            if (!completed)
            {
                //start monitoring the process
                StartTracking();
            }

            DA.SetData(0, completed);
        }

        private void StartTracking()
        {

            tracker = new BackgroundWorker();
            tracker.DoWork += new DoWorkEventHandler(Tracker_DoWork);
            tracker.RunWorkerCompleted += new RunWorkerCompletedEventHandler(Tracker_RunWorkerCompleted);
            tracker.RunWorkerAsync();
            completed = false;
        }



        private void Tracker_DoWork(object sender, DoWorkEventArgs e)
        {
            bool isJobRunning = true;

            while (isJobRunning)
            {
                Thread.Sleep(1000); //find the part which does the thing 
                //Do you pooling
                LastUpdate = !deadlineClient.IsJobCompleted(jobID).Result;
            }
        }

        private void Tracker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            completed = true;
            _context.Post(RunComponent, "");
        }

        private void RunComponent(object component)
        {
            try
            {
                ExpireSolution(true);
            }
            catch
            {
                //not working when opening file and debugging at times
            }
        }
    }
}