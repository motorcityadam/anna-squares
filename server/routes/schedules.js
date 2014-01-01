// ****** REST Layout (no user management) ******
// :schedule - schedule ID {String} - datecode hash (based on MMDDYYYY)
// :task     - task ID {String}     - SHA-1 hash of the task text
//
// *** Schedules app routes ***
// GET /schedules (List all schedules)
// POST /schedules (Create a new schedule)
// GET /schedules/:schedule (Retrieve a specific schedule)
// PATCH /schedules/:schedule (Edit an existing schedule)
// DELETE /schedules/:schedule (Delete an existing schedule)
//
// ****** REST Layout (with user management) ******
// :user     - username {String}
// :schedule - schedule ID {String} - datecode hash (based on MMDDYYYY)
// :task     - task ID {String}     - SHA-1 hash of the task text
//
// *** Schedules app routes ***
// GET /:user/schedules (List all schedules for the currently logged in user)
// POST /:user/schedules (Create a new schedule for the currently logged in user)
// GET /:user/schedules/:schedule (Retrieve a specific schedule for the currently logged in user)
// PATCH /:user/schedules/:schedule (Edit an existing schedule for the currently logged in user)
// DELETE /:user/schedules/:schedule (Delete an existing schedule for the currently logged in user)
//