using System;
using System.Collections.Generic;
using System.Text;

namespace Cs55Jobs.Domain.Model
{
    public class JobPostParam
    {
        public JobInfoParam Job { get; set; }

        public JobTriggerParam Trigger { get; set; }

        public JobSettingsParam Settings { get; set; }
    }
}
