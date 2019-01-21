using Cs55Jobs.Domain.Model;
using Cs55Jobs.InnerJobs;
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Specialized;
using System.Threading.Tasks;

namespace Cs55Jobs
{
    public class JobsService : IJobsService
    {
        private static IScheduler sched;

        private static async Task RunProgram()
        {
            try
            {
                // Grab the Scheduler instance from the Factory
                NameValueCollection props = new NameValueCollection
                {
                    { "quartz.serializer.type", "binary" }
                };
                StdSchedulerFactory factory = new StdSchedulerFactory(props);
                sched = await factory.GetScheduler();

                // and start it off
                await sched.Start();

                // some sleep to show what's happening
                await Task.Delay(TimeSpan.FromSeconds(60));

                // and last shut down the scheduler when you are ready to close your program
                await sched.Shutdown();
            }
            catch (SchedulerException se)
            {
                await Console.Error.WriteLineAsync(se.ToString());
            }
        }

        public void Start()
        {
            RunProgram().GetAwaiter().GetResult();
        }

        public IScheduler Scheduler
        {
            get { return sched; }
        }

        public void GetJobs()
        {
            var group = sched.GetJobGroupNames();
            var groupNames = group.GetAwaiter().GetResult();


        }

        public void AddJob(string identity, string expression, string description, DateTime startAt)
        {
            DateTime startTime = DateTime.SpecifyKind(startAt, DateTimeKind.Utc);

            // define the job and tie it to our HelloJob class
            IJobDetail job = JobBuilder.Create<DebugJob>()
                .WithIdentity(identity, "group1") // name "myJob", group "group1"
                .Build();

            // Trigger the job to run now, and then every 40 seconds
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("myTrigger", "group1")
                .StartAt(startTime)
                .WithSimpleSchedule(x => x
                    .WithIntervalInSeconds(40)
                    .RepeatForever())
                .Build();

            // Tell quartz to schedule the job using our trigger
            sched.ScheduleJob(job, trigger);
        }
    }
}
