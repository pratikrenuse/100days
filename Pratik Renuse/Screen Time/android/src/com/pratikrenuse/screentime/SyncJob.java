package com.pratikrenuse.screentime;

import android.app.job.JobParameters;
import android.app.job.JobService;

/** Backup sync every 15 minutes, so data still uploads if the tracker service is off. */
public class SyncJob extends JobService {
    @Override
    public boolean onStartJob(final JobParameters params) {
        new Thread(() -> {
            Sync.run(getApplicationContext());
            jobFinished(params, false);
        }).start();
        return true;
    }

    @Override
    public boolean onStopJob(JobParameters params) {
        return true;
    }
}
