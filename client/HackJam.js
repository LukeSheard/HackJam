Tasks = new Mongo.Collection("tasks");

if(Meteor.isClient){
   Template.body.helpers({
      tasks: function(){
         return Tasks.find(
            {},
            {sort: {createdAt: -1}}
         );
      }
   });

   Template.body.events({
      "submit .new-task": function(event) {
         var course = event.target.course.value;
         var title = event.target.title.value;
         var date = event.target.date.value;
         var notes = event.target.notes.value;
         var createdAt = new Date();
         
         Tasks.insert({
            course: course,
            title: title,
            date: date,
            notes: notes,
            createdAt: createdAt,
         });

         event.target.text.value="";
         return false;
      }
   });
}