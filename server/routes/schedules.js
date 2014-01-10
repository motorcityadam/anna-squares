// ****** REST Layout ******
// :schedule - schedule ID {String} - datecode hash (based on MMDDYYYY)
//
// *** Schedule app routes ***
// GET     /schedules                 ->  index
// GET     /schedules/new             ->  new
// POST    /schedules                 ->  create
// GET     /schedules/:schedule       ->  show
// GET     /schedules/:schedule/edit  ->  edit
// PUT     /schedules/:schedule       ->  update
// DELETE  /schedules/:schedule       ->  destroy

exports.index = function(req, res){
  res.send('schedule index');
};

exports.new = function(req, res){
  res.send('new schedule');
};

exports.create = function(req, res){
  res.send('create schedule');
};

exports.show = function(req, res){
  res.send('show schedule ' + req.params.schedule);
};

exports.edit = function(req, res){
  res.send('edit schedule ' + req.params.schedule);
};

exports.update = function(req, res){
  res.send('update schedule ' + req.params.schedule);
};

exports.destroy = function(req, res){
  res.send('destroy schedule ' + req.params.schedule);
};